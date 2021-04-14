const { leerInput, pausa, inquirerMenu } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main  = async ( ) => {

    const busquedas = new Busquedas();
    let opt;

    do{

        opt = await inquirerMenu();
        
        switch ( opt ){

            case 1:
            const lugar = await leerInput('Ciudad:')
            console.log(lugar);
            await busquedas.ciudad( lugar );

            console.log('Informacion de la ciudad');
            console.log('Ciudad:');
            console.log('Lat');
            console.log('long');
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