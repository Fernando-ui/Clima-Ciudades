//  Para hacer que el token se pueda guardar de manera global
require('dotenv').config()

const { leerInput, pausa, inquirerMenu, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

// console.log(process.env.MAPBOX_KEY);


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
            if(id === '0') continue;

            // Guardar en db
            
            const lugarSel = lugares.find( (l) => l.id === id);

            busquedas.agregarHisotial(lugarSel.nombre)
            const prueba = await  busquedas.climaLugar(lugarSel.lat,lugarSel.lng);
            const {desc,min,max,temp} = await prueba;
            
            
            console.log('\n');
            console.log('Informacion de la ciudad',lugarSel.nombre);
            console.log('Ciudad:',lugarSel.nombre);
            console.log('Lat', lugarSel.lat);
            console.log('long',lugarSel.lng);
            console.log('Temperatura:',temp);
            console.log('Minima:',min);
            console.log('Maxima:',max);
            console.log('Como esta el clima:',desc);
            break;
            
            case 2:
            
                busquedas.getHistorialCapitalizado.forEach((lugar, i ) => {
                    
                    const idx = `${i + 1}.`.blue;
                    console.log(`${idx} ${lugar}`);
                })
                busquedas.leerBD();
                

                break;
        }


        if(opt !== 0) await pausa();
        

    }while( opt !== 0 )


}
main();