const axios = require('axios');



class Busquedas {

    historial = [''];

    constructor( ) {

        //TODO: Leer el db 

    }
    get getParamsMapbox ( ){
        return{
            
                'access_token': 'pk.eyJ1IjoiZmVyc3QiLCJhIjoiY2tuaGwyeHdpMG1vajJvcGNjbW02andyaiJ9.xukQtlq_0-WccfDnaD_fnA',
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

            console.log(resp.data);
    
    
            return [];

        }catch(e){
            console.error(e);
            return [];
        }
            

    }


}

module.exports = Busquedas;