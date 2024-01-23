export class Cicle{
    constructor(nom, categoria, numAlumnes,abreviatura){
        this.nom = nom;
        this.categoria = categoria;
        this.numAlumnes = numAlumnes;
        this.abreviatura = abreviatura;
        this.numEdicions = 0;
    }

    getNom(){
        return this.nom;
    }
    getCategoria(){
        return this.categoria;
    }
    getNumAlumnes(){
        return this.numAlumnes;
    }
    getAbreviatura(){
        return this.abreviatura;
    }
    getNumEdiciones(){
        return this.numEdicions;
    }

    setNom(nomN){
        this.nom = nomN;
    }
    setCategoria(categoriaN){
        this.categoria = categoriaN;
    }
    setNumAlumnes(numAlumnesN){
        this.numAlumnes = numAlumnesN;
    }
    setAbreviatura(abreviaturaN){
        this.abreviatura = abreviaturaN;
    }
    setNumEdiciones(numero){
        this.numEdicions=numero;
    }
}