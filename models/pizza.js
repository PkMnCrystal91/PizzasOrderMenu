
class Pizza{

 
    pizza = [
        {
            Suprema: 'Suprema',
            Peperoni: 'Peperoni',
            Jamon: 'Jamon',
            Hawainna: 'Hawaiana',
            Napolitana: 'Napolitana'
        }
    ];
    tamano =[
        {
            Personal: 'Personal',
            Familiar: 'Familiar',
            Gigante: 'Gigante'
        }
    ];

    constructor( pizza, tamano){
        this.pizza = pizza;
        this.tamano = tamano;

    }

}

module.exports = Pizza;