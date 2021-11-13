require('colors');

const { guardarDB , leerDB } = require('./helpers/crudBD');

const { inquireOptions,
        leerInput,
        pausa,
        listadoOrdenesBorrar,
        confirmar,
        confirmarDelivery,
        mostrarListadoCheckList
        
} = require('./helpers/inquirer');
const Ordenes = require('./models/ordenes');


const main = async() => {

    let opt = '';
    const ordenes = new Ordenes();

    const ordenesBD = leerDB();

    if ( ordenesBD ) { // cargar tareas
        ordenes.cargarOrdenesFromArray( ordenesBD );
    }

    do {

        opt = await inquireOptions();

        switch ( opt ){
            case '1':
                const ok = await confirmarDelivery('¿Orden con servicio delivery?')
                if(ok){
                    const nombClnt = await leerInput('Nombre del cliente:');
                    const tel = await leerInput('Telefono:'); 
                    const direc = await leerInput('Direccion de envio:');              
                    
                    ordenes.crearOrden( nombClnt, tel, direc);
                    break;
                }
                const nombClnt = await leerInput('Nombre del cliente:');
                const tel = await leerInput('Telefono:');               
                
                ordenes.crearOrden( nombClnt, tel);
                
            break;

            case '2':
                ordenes.listadoOrdenes();               
            break;

            case '3':
                ordenes.listarOrdenesPendientesCompletadas(true);               
            break;

            case '4':
                ordenes.listarOrdenesPendientesCompletadas(false);               
            break;

            case '5':
                const ids = await mostrarListadoCheckList( ordenes.listadoArr );
                ordenes.toggleCompletadas(ids);

            break;

            case '6':
                const id = await listadoOrdenesBorrar( ordenes.listadoArr );
                if( id !== '0'){
                    const ok = await confirmar('¿Esta seguro de eliminar la orden?');
                    if(ok){
                        ordenes.borrarOrden(id);
                        console.log('Orden eliminada!!')
                    }
                }

            break;
        }
        
        guardarDB( ordenes.listadoArr );
        
        await pausa();

    } while( opt != '0' );
}

main();