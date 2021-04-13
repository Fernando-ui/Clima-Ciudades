const inquirer = require('inquirer');
const colors = require('colors');

const preguntas = 
[   
    {
    type:'list',
    name:'opcion',
    message:'Que desea hacer?',
    choices: [ 
        {
            value: 1,
            name:`${'1.'.blue} Buscar Ciudad`
        },
        {
            value: 2,
            name: `${'2.'.blue} Historial`
        },
        {
            value: 3,
            name:`${'3.'.blue} Listar tareas completadas`
        },
        {
            value: 0,
            name:`${'0.'.blue} Salir`
        },

            ]
    }
];



const inquirerMenu = async ( ) => {

    console.clear()

    console.log('========================='.blue);
    console.log('Seleccione alguna opcion'.green);
    console.log('========================='.blue);

    const {opcion} = await inquirer.prompt(preguntas);

    return opcion;


}

const ans = [{

    type:'input',
    name:'opcion',
    message:`Presiona ${'Enter'.red} para continuar`,
    
}];

const pausa = async ( ) =>{

        await inquirer.prompt(ans);
    

};
// Hacemos que muestre la pregunta que estamos mandando
const leerInput = async ( message ) => {

    const   question = [
        {

            type: 'input',
            name: 'desc',
            message,
            validate( value ){

                if( value.length === 0){

                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ]

    const { desc } = await inquirer.prompt( question );
    return desc;
    
}


const listadoTareasBorrar = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i ) => {

        const idx = `${i + 1}.`;

        return {

            value: tarea.id,
            name: `${ idx } ${tarea.desc}`

        }
    })
    choices.unshift({
        value:'0',
        name:'0.'.blue + ' Cancelar'
    });
    const preguntas = [

        {
            type:'list',
            name:'id',
            message:'Borrar',
            choices


        }
    ]

    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar =async ( message ) => {

    const question = [

        {
            type:'confirm',
            name:'ok',
            message
        }
    ]
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostarListadoCheckList = async( tareas = [] ) => {

    const choices = tareas.map( (tarea, i ) => {

        const idx = `${i + 1}.`;

        return {

            value: tarea.id,
            name: `${ idx } ${tarea.desc}`,
            checked: ( tarea.completadoEn) ? true : false

        }
    })
    
    const pregunta = [

        {
            type:'checkbox',
            name:'ids',
            message:'Seleccione',
            choices


        }
    ]

    const {ids} = await inquirer.prompt(pregunta);
    return ids;


}


module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostarListadoCheckList
}