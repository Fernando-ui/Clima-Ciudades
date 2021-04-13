const { leerInput } = require("./helpers/inquirer");


const main  = async ( ) => {

    const texto = await leerInput('Agregando mensaje');

    console.log(texto);

}
main();