// import Swal from 'sweetalert2'

//Generar gramatica de la actividad
const gramatica = {
    "S" : ["A", "B", "V"],
    "A" : ["automata"],
    "V" : ["fin"],
    "B" : ["AL", "F"],
    "AL" : ["G", ":" , "SM", "RA", ";"],
    "G" : ["alfabeto"],
    "SM" : ["LeDi"],
    "RA" : [",", "SM", "RA", "ε"],
    "F" : ["C", ":", "D", ";"],
    "C" : ["aceptacion"],
    "D" : ["digito"]
}

//Generar tabla predictiva de actividad
const tablaPredictiva = {
    "SNT": [",",  "automata", "fin", "alfabeto", "aceptacion", "LeDi", "digito", ":", ";"],
    "S":   [null, "S",         null,  null,       null,         null,    null,    null, null],
    "A":   [null, "A",         null,  null,       null,         null,    null,    null, null],
    "V":   [null, null,        "V",   null,       null,         null,    null,    null, null],
    "B":   [null, null,        null,  "B",        null,         null,    null,    null, null],
    "AL":  [null, null,        null,  "AL",       null,         null,    null,    null, null],
    "G":   [null, null,        null,  "G",        null,         null,    null,    null, null],
    "SM":  [null, null,        null,  null,       null,         "SM",    null,    null, null],
    "RA":  ["RA", null,        null,  null,       null,         null,    null,    null, "RA"],
    "F":   [null, null,        null,  null,       "F",          null,    null,    null, null],
    "C":   [null, null,        null,  null,       "C",          null,    null,    null, null],
    "D":   [null, null,        null,  null,       null,         null,    "D",     null, null],
}


function NoTerminal(s) {
     const terminales = ["S","A","V","B","AL","G","SM","RA","F","C","D"];
     return !(terminales.indexOF(s) === -1);
}

function obtenerDatos(data){
    let datos = tablaPredictiva?.[data]?.filter(item => item !== null)[0];
    return datos && gramatica?.[datos];
}

export function validarSintaxis(sintaxi){
    let stack = ["$","S"];
    let sintaxiStack = sintaxi.match(/([a-zA-Z_]\w*|\S)/g).toString().split(",");
    console.log("* Esta es la pila -> ", stack.toString());
    console.log("* Esta es la cadena a evaluar -> ", sintaxiStack);

    while(stack.length > 0){
        let a = stack.pop();
        console.log("Elemento tope de la pila es : ", a)
        if(a === "$"){
            console.log("Cadena finalizada - Cadena Valida");
            //TODO Agregar SweetAlert
            return;
        } else if (NoTerminal(a)){
            console.log(a, " - No terminal");
            const datos = obtenerDatos(a);
            if(datos){
                for(let i = 0; i <= datos.length - 1; i++){
                    stack.push(datos[i]);
                }
                console.log("La nueva pila es -> ", stack);
            }else{
                console.log("No se pudo encontrar alguna producción")
                console.log("La pila quedo -> ", stack.toString());
                //TODO Agregar SweetAlert de error de cadena
                return;
            }
        } else {
            console.log(a, " - es terminal");
            let b = sintaxiStack.pop()
            console.log("Elemento tope de cadena es : ", b);

            if(a===b || (a === "LeDi" && a.regex((/^[a-zA-Z][0-9]/)).test(b)) ){
                console.log("Sintaxis valida entre pila y cadena")
            } else {
                console.log("Sintaxis invalida entre pila y cadena");
                console.log("La pila queda -> ", stack.toString());
                //TODO Agregar SweetAlert de error de comparación
                return;
            }
        }

    }
}


