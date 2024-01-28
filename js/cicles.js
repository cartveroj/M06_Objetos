/*Clase de Cicle con sus propiedades y metodos */
export class Cicle{

    constructor(nom, categoria, numAlumnes,abreviatura){
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
        this.arrayModuls = [];
        this.data;
    }

   incrementeNumEdiciones(){
    this.numEdicions++;
   }
   añadirModul(modul){
    this.arrayModuls.push(modul);
   }
   dataLastEdited(data){
    this.data= data;
   }
//metodo que retorna en String la data 
   getData(){
    return (this.data != undefined)?this.data.toString().slice(0,24):"";
   }

  //metodo que retorna en String las propiedades
   toString(){
    return `
    \nnom: ${this.nom}
    \ncategoria: ${this.categoria}
    \nnumAlumnes: ${this.numAlumnes}
    \nabreviatura: ${this.abreviatura}
    \nModules: ${this.arrayModuls.sort(function(a,b){a.num - b.num})}
    \nFecha ultima edicion:${this.getData()}
    `
   }

}