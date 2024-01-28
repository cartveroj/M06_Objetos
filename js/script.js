//imports de de las clases
import {Cicle} from './cicles.js';
import {Modul} from './modul.js';

let llistatCicles = [];

//eventos listeners 
document.getElementById("btnAfegirCicle").addEventListener("click", afegirCicle);
document.getElementById("btnAfegirModul").addEventListener("click", afegirModul);


//funcion que se encarga de crear cicles
function afegirCicle(){
    let nom = document.getElementById("cicle_nom").value;
    let categoria = document.getElementById("cicle_categoria").value;
    let numAlumnes = document.getElementById("cicle_alumnes").value;
    let abreviatura = document.getElementById("cicle_abr").value;
    
    let editCicleValue = document.getElementById("editCicle").value;
    if(editCicleValue === "-1" || editCicleValue === "" || editCicleValue === null || editCicleValue === undefined){
        //Afegim el cicle al llistat
        let cicle = new Cicle(nom,categoria,numAlumnes,abreviatura);
        console.log(cicle.toString());
        llistatCicles.push(cicle);
    }else{
        //Editar cicle
        let index = parseInt(document.getElementById("editCicle").value);
        if(index >=0){
            let cicleRec = llistatCicles[index];
            cicleRec.nom = nom;
            cicleRec.categoria = categoria;
            cicleRec.numAlumnes = numAlumnes;
            cicleRec.abreviatura = abreviatura;
            let dataActualizacion = new Date();
            cicleRec.dataLastEdited(dataActualizacion);
            cicleRec.incrementeNumEdiciones();
            console.log(`\nMatricula:${cicleRec.nom}\nNumero de ediciones: ${cicleRec.numEdicions}\nFecha última edición: ${cicleRec.getData()}`);
        }
    }
    
    //Actualitzem el selector
    actualitzarSelector();

    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();

    document.getElementById("editCicle").value=-1;
 
 }

//Funcion que asigna a los modulos a la propiedad de Cicle
function afegirModulAlCicle(modul, index){
    let cicleRecuperado = llistatCicles[index];
    cicleRecuperado.añadirModul(modul);
    console.log(cicleRecuperado.toString());
}
//funcion que se encarga de añadir modulos 

function afegirModul(){
    let cicle = document.getElementById("modul_cicle").value;
    let modul_nom = document.getElementById("modul_nom").value;
    let modul_num = document.getElementById("modul_num").value;
    let modul_hores = document.getElementById("modul_hores").value;

    let modul = new Modul(cicle, modul_nom, modul_num, modul_hores);
    console.log(modul);
    //Añadimos el modul al array del cicle
    afegirModulAlCicle(modul, cicle);
    //Printem la llista
    printLlistat(llistatCicles);

    //Netegem els formularis
    netejarFormularis();
}


//Funció per llistar els cicles
function printLlistat (llistat){
    let str="";
    llistat.forEach(function(element, index){
        str += `<div class="block p-6 mb-3 w-full bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100">
                    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">${element.abreviatura.toUpperCase()}. ${element.nom}</h5>
                    <h6 class="text-gray-700">${element.categoria}</h6>
                    <p class="font-normal text-gray-700">Num d'alumnes: ${element.numAlumnes}</p>

                    <button type="button" id="btnRemoveCicle-${index}"  data-index="${index}" class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Eliminar</button>
                    <button type="button" id="btnEditCicle-${index}" data-index="${index}" class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Editar</button>
                    <button type="button" id="btnCalculHores-${index}" data-index="${index}" class="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2">Càlcul hores</button>
                </div>`;
    });

    document.getElementById("llistat").innerHTML=str;
    //asignamos los eventos 
    asignarListeners(llistat);
}
//funcion que asigna los EventListener a cada elemento de la lista
function asignarListeners(llistat){
    llistat.forEach(function(element, index){
        document.getElementById(`btnRemoveCicle-${index}`).addEventListener("click", function() { removeCicle(index) });
        document.getElementById(`btnEditCicle-${index}`).addEventListener("click", function() { editCicle(index) });
        document.getElementById(`btnCalculHores-${index}`).addEventListener("click", function() { calculHores(index) });
    });
}

//Funció per eliminar un cicle
function removeCicle(i){
    llistatCicles.splice(i,1);
    actualitzarSelector();
    printLlistat(llistatCicles);
}

//Funció per actualitzar el selector de cicles cada vegada que afegim un cicle
function actualitzarSelector(){
    let select = document.getElementById('modul_cicle');
    select.innerHTML = "";
    llistatCicles.forEach(function(element, index){
        let opt = document.createElement('option');
        opt.value = index;
        opt.text = element.nom;
        select.appendChild(opt);
    });
}




//Funció per editar un cicle
function editCicle(i){
    document.getElementById("cicle_nom").value = llistatCicles[i].nom;
    document.getElementById("cicle_categoria").value = llistatCicles[i].categoria;
    document.getElementById("cicle_alumnes").value = llistatCicles[i].numAlumnes;
    document.getElementById("cicle_abr").value = llistatCicles[i].abreviatura;

    document.getElementById("editCicle").value=i;

    

}

//Funció que suma las horas de los modulos por ciclo
function calculHores(i){
    let cicleModul = llistatCicles[i];
    let sumaHoras = 0;
    cicleModul.arrayModuls.forEach((element)=>{
     sumaHoras = sumaHoras + parseInt(element.hores);
    });
    if(cicleModul.arrayModuls.length == 0){
     alert(`El cicle no tiene asignado ningúna modulo`)
    }else{
     alert(`horas totales del cicle: ${sumaHoras}`)
    }
    
 }
//Funció per netejar els formularis
function netejarFormularis(){
    var inputs = document.getElementsByTagName("input");
    for (let i=0; i < inputs.length; i++) {
        inputs[i].value = "";
    }

    var selects = document.getElementsByTagName("select");
    for (let i=0; i < selects.length; i++) {
        selects[i].value = 0;
    }
}