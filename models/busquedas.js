const axios = require('axios');



class Busquedas {

    historial = [''];

    constructor( ) {

        //TODO: Leer el db 

    }

    async ciudad ( lugar = ''){

        try{
            // Peticon http
            // console.log('ciudad',lugar);
            const resp = await axios.get('https://reppppqres.in/api/users?page=2');
            console.log(resp.data.total);
    
    
            return [];

        }catch(e){
            console.error(e);
            return [];
        }
            

    }


}

module.exports = Busquedas;