const { green } = require('colors');
const inquirer = require('inquirer');
require('colors');

const opcionesOrden = [
    {
        type: 'list',
        name: 'option',
        message: 'Seleccione una opcion: ',
        choices: [
            {
                value: '1',
                name: `${'>.'.red } Crear orden`
            },
            {
                value: '2',
                name: `${'>.'.red } Listar ordenes`
            },
            {
                value: '3',
                name: `${'>.'.red } Listar ordenes completadas`
            },
            {
                value: '4',
                name: `${'>.'.red } Listar ordenes pendientes`
            },
            {
                value: '5',
                name: `${'>.'.red } Completar Orden(s)`
            },
            {
                value: '6',
                name: `${'>.'.red } Borrar orden`
            },
            {
                value: '0',
                name: `${'>.'.red } Salir`
            },
        ]
    }
];


const inquireOptions = async() => {

    console.clear();
    console.log('          ======='.red);
    console.log('       ============='.red);
    console.log('   ====================='.red);
    console.log('============================'.red);
    console.log(' || Pizza da Gutierritos ||'.white );
    console.log('============================'.red);
    console.log('============================\n'.red);

    const { option } = await inquirer.prompt(opcionesOrden);

    return option;
}

const pausa = async() => {
    
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${ 'ENTER'.green } para continuar`
        }
    ];

    console.log('\n');
    await inquirer.prompt(question);
}

const leerInput = async( message ) => {

    const question = [
        {
            type: 'input',
            name: 'request',
            message,
            validate( value ) {
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    const { request } = await inquirer.prompt(question);
    
    return request;
}

const listadoOrdenesBorrar = async( ordenes = [] ) =>{

    const choices = ordenes.map( ( orden, i ) => {

        const idx = `${i + 1}.`.red;

        return {
            value: orden.id,
            name: `${ idx } Nombre: ${orden.nombreCliente} Telefono: ${orden.telefonoCliente}`
        }
    });

    choices.unshift({
        value:'0',
        name: '0.'.green+'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async(message) => {

    const questions = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(questions);
    return ok;
}

const confirmarDelivery = async( message ) =>{

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async( ordenes = []) => {

    const choices = ordenes.map( (orden, i) => {

        const idx = `${i+1}.`.green;

        return {
            value: orden.id,
            name:  `${ idx } ${ (orden.nombreCliente+'.').gray } Telefono:${ (orden.telefonoCliente+'.').gray }`,
            checked: ( orden.ordenEstado ) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquireOptions,
    pausa,
    leerInput,
    confirmar,
    listadoOrdenesBorrar,
    confirmarDelivery,
    mostrarListadoCheckList

}