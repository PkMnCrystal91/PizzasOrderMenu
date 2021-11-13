const Orden = require('./orden');

class Ordenes {

    _listado= {};

    get listadoArr(){

        const listado = [];
        Object.keys(this._listado).forEach( key => {
            const orden = this._listado[key];
            listado.push( orden );
        });

        return listado;
    }

    constructor(){
        this._listado = {};
    }    

    borrarOrden( id = ''){

        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cargarOrdenesFromArray( ordenes = [] ){

        ordenes.forEach( orden => {
            this._listado[orden.id] = orden;
        });
    }

    crearOrden( nombClnt = '', tel='', direc = '' ) {

        const orden = new Orden(nombClnt, tel, direc);       
        this._listado[orden.id] = orden;
                
    }

    listadoOrdenes() {

        console.log();
        this.listadoArr.forEach( (orden, i) =>{

            const idx = `${ i + 1}`.green;
            const { nombreCliente, ordenEstado, telefonoCliente, direccion } = orden;
            const estado = ( ordenEstado )
                                ? 'Entregada'.green
                                : 'Pendiente'.yellow;
            
            console.log(`${ idx } Nombre: ${ (nombreCliente+'.').grey } Telefono: ${ (telefonoCliente+'.').grey } Direccion: ${ (direccion+'.').grey }  :: ${ estado }`);

        });
    }

    listarOrdenesPendientesCompletadas( completadas = true ){

        console.log();
        let contador = 0;
        this.listadoArr.forEach( orden => {

            const { nombreCliente, ordenEstado, telefonoCliente } = orden;
            const estado = ( ordenEstado )
                                ? 'Completada'.green
                                : 'Pendiente'.yellow;
            if( completadas ){
                if( ordenEstado ){
                    contador += 1;
                    console.log(`${(contador+'.').blue} Nombre: ${(nombreCliente+'.').grey} Telefono: ${(telefonoCliente+'.').grey} :: ${ordenEstado.green}`);
                }
            }else{

                if ( !ordenEstado ){
                    contador += 1;
                    console.log(`${(contador+'.').blue} Nombre: ${(nombreCliente+'.').grey} Telefono: ${(telefonoCliente+'.').grey} :: ${estado}`);
                }
            }
        });
    }

    toggleCompletadas( ids = [] ) {

        ids.forEach( id => {

            const orden = this._listado[id];
            if ( !orden.ordenEstado ) {
                orden.ordenEstado = new Date().toISOString()
            }

        });

        this.listadoArr.forEach( orden => {

            if ( !ids.includes(orden.id) ) {
                this._listado[orden.id].ordenEstado = null;
            }

        });


    }

}

module.exports = Ordenes;