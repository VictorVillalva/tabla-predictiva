import Swal from 'sweetalert2'

//TODO Generar gramatica de la actividad
const gramatica = {
    "S" : ["A", "B", "V"],
    "A" : ["automata"],
    "V" : ["fin"],
    "B" : ["AL", "F"],
    "AL" : ["G", ":" , "SM", "RA", ";"],
    "G" : ["alfabeto"],
    "SM" : ["letra", "digito"],
    "RA" : [",", "SM", "RA", "ε"],
    "F" : ["C", ":", "D", ";"],
    "C" : ["aceptacion"],
    "D" : ["digito"]
}

//TODO Generar tabla predictiva de actividad
const tablaPredictiva = {
    "SNT": [",",  "automata", "fin", "alfabeto", "aceptacion", "letra", "digito", ":", ";"],
    "S":   [null, "S",         null,  null,       null,         null,    null,    null, null],
    "A":   [null, "A",         null,  null,       null,         null,    null,    null, null],
    "V":   [null, null,        "V",   null,       null,         null,    null,    null, null],
    "B":   [null, null,        null,  "B",        null,         null,    null,    null, null],
    "AL":  [null, null,        null,  "AL",       null,         null,    null,    null, null],
    "G":   [null, null,        null,  "G",        null,         null,    null,    null, null],
    "SM":  [null, null,        null,  null,       null,         "SM",    "SM",    null, null],
    "RA":  ["RA", null,        null,  null,       null,         null,    null,    null, "RA"],
    "F":   [null, null,        null,  null,       "F",          null,    null,    null, null],
    "C":   [null, null,        null,  null,       "C",          null,    null,    null, null],
    "D":   [null, null,        null,  null,       null,         null,    "D",     null, null],
}

//TODO Generar función validacion de terminales
function NoTerminal(s) {
     const terminales = ["S","A","V","B","AL","G","SM","RA","F","C","D"];
     return !(terminales.indexOF(s) === -1);
}

function obtenerDatos(data){
    let datos = tablaPredictiva?.[data]?.filter(item => item !== null)[0];
    return datos && gramatica?.[datos];
}

function validarSintaxis(sintaxi){
    let stack = ["$","S"];
    let sintaxiStack =
}


