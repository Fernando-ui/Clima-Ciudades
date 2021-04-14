//  Para hacer que el token se pueda guardar de manera global
require('dotenv').config()

const { leerInput, pausa, inquirerMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

console.log(process.env.MAPBOX_KEY);


const main  = async ( ) => {

    const busquedas = new Busquedas();
    let opt;

    do{

        opt = await inquirerMenu();
        
        switch ( opt ){

            case 1:
            const termino = await leerInput('Ciudad:')
            const lugares = await busquedas.ciudad( termino );
            const id = await listarLugares(lugares);
            const lugarSel = lugares.find( (l) => l.id === id);
            // console.log(lugarSel);

            console.log('\n');
            console.log('Informacion de la ciudad',lugarSel.nombre);
            console.log('Ciudad:',lugarSel.nombre);
            console.log('Lat', lugarSel.lat);
            console.log('long',lugarSel.lng);
            console.log('Temperatura:');
            console.log('Minima:');
            console.log('Maxima:');
                break;

            case 2:
                break;
        }


        if(opt !== 0) await pausa();
        

    }while( opt !== 0 )


}
main();