/*Clase de Modul con sus propiedades y metodos */
export class Modul{
    constructor(cicle, nom, num, hores){
        this.cicle = cicle;
        this.nom = nom;
        this.num = num;
        this.hores = hores;
        
    }
    //metodo que retorna en String las propiedades
    toString(){
        return `MP${this.num}.${this.nom} (${this.hores}hrs)`
    }
}
