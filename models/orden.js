const { v4: uudiv4 } = require('uuid');

class Orden{

    id= '';
    nombreCliente = '';
    telefonoCliente = '';
    direccion = '';
    
    ordenEstado = null;

    constructor( nombClnt, tel, direc ){

        this.id = uudiv4();
        this.nombreCliente = nombClnt;
        this.telefonoCliente = tel;
        this.direccion = direc;

        this.ordenEstado = null;

    }
}

module.exports = Orden;