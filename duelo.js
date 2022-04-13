class Card{
    constructor(name,cost){
        this.name=name;
        this.cost=cost;
    }
}

class Unit extends Card{
    constructor(name,cost,power,res){
        super(name,cost);
        this.power=power;
        this.res=res;
    }
    attack(target){
        if( target instanceof Unit ) {
            target.res-=this.power;
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
    printStats(){
        console.log(`\nStats:\nNombre: ${this.name} \nCosto: ${this.cost}\nPoder: ${this.power}\nResiliencia: ${this.res}`);
    }
}

class Effect extends Card{
    constructor(name,cost,stat,magnitude){
        super(name,cost);
        this.stat=stat;//'resilience' or 'power'
        this.magnitude=magnitude;
        this.text=`${this.magnitude>=0?'Raise':'Lower'} the target's ${this.stat} by ${Math.abs(this.magnitude)}`;
    }
    play( target ) {
        if( target instanceof Unit ) {
            if(this.stat=='resilience'){
                target.res+=this.magnitude;
            }else if(this.stat=='power'){
                target.power+=this.magnitude;
            }
        } else {
            throw new Error( "Target must be a unit!" );
        }
    }
}

// Declaración de instancias de Efectos
let AlgoritmoDificil= new Effect("Algoritmo Difícil",2,'resilience',3);
console.log(AlgoritmoDificil.text);
let RechazoPromesaNoManejado= new Effect("Rechazo de promesa no manejado",1,'resilience',-2);
console.log(RechazoPromesaNoManejado.text);
let ProgramacionEnPareja= new Effect("Programación en pareja",3,'power',2);
console.log(ProgramacionEnPareja.text);

//// Duelo
console.log("\n---- Duelo ----")
// Jugador 1
let NinjaCinturonRojo= new Unit("Ninja Cinturón Rojo",3,3,4);
NinjaCinturonRojo.printStats();
AlgoritmoDificil.play(NinjaCinturonRojo);
NinjaCinturonRojo.printStats();

// Jugador 2
let NinjaCinturonNegro= new Unit("Ninja Cinturón Negro",4,5,4);
NinjaCinturonNegro.printStats();
RechazoPromesaNoManejado.play(NinjaCinturonRojo);
NinjaCinturonRojo.printStats();

// Jugador 1
ProgramacionEnPareja.play(NinjaCinturonRojo);
NinjaCinturonRojo.printStats();
NinjaCinturonRojo.attack(NinjaCinturonNegro);
NinjaCinturonNegro.printStats();
