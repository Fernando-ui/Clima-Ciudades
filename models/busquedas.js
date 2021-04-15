const fs = require('fs');
const axios = require('axios');



class Busquedas {

    historial = [];
    dbPath = './db/database.json'

    constructor( ) {

        //TODO: Leer el db 

    }
    get getParamsMapbox ( ){
        return{
            
                'access_token': process.env.MAPBOX_KEY,
                'limit': 5,
                'languaje':'es'
            
        }
    };


    async ciudad ( lugar = ''){

        try{
            // Peticon http
            
            const instance = axios.create({
                baseURL:`https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.getParamsMapbox
            });

            const resp = await instance.get();

            return resp.data.features.map( ( lugar ) =>({ 

                id:lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat:lugar.center[1]
            }))
    

        }catch(e){
            console.error(e);
            return [];
        }
            

    }
    get getParametrosClima(){ 

        return{

            'appid':process.env.OPENWEATHER_KEY,
            'units': 'metric',
            'lang':'es'

        };

    };

    async climaLugar(lat, lon){

        try{

            // Crear la instancias de axios.create()
            const busquedaClima = axios.create({

                baseURL:`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`,
                params: this.getParametrosClima
            })

            const ans = await busquedaClima.get();
            const {weather,main} = ans.data;

            return{
                desc: weather[0].description,
                min:main.temp_min,
                max:main.temp_max,
                temp:main.temp

            }

        }catch(e){

            console.log('Ha habido un error');

        }
    }

    agregarHisotial(lugar = ''){
    
        if(this.historial.includes(lugar.toLocaleLowerCase())){
            return;
        }
        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();

    }

    guardarDB(){

        const payload = {
            historial: this.historial
        }
        fs.writeFileSync(this.dbPath, JSON.stringify(payload))

    }
    leerBD(){


    }
}

module.exports = Busquedas;