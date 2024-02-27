import Swal from 'sweetalert2';

//Generar tabla predictiva de actividad
const tabla = {
    "SNT": [",",  "automata", "fin", "alfabeto", "aceptacion", "LetraODigito", "Digito", ":", ";"],
    "S":   [null, ["A","B","V"],null,  null,       null,         null,    null,    null, null],
    "A":   [null, ["automata"], null,  null,       null,         null,    null,    null, null],
    "V":   [null, null,        ["fin"],null,       null,         null,    null,    null, null],
    "B":   [null, null,        null,  ["AL","F"],  null,         null,    null,    null, null],
    "AL":  [null, null,        null,  ["G",":","SM","RA",";"],null,null,  null,    null, null],
    "G":   [null, null,        null,  ["alfabeto"],null,         null,    null,    null, null],
    "SM":  [null, null,        null,   null,       null,         ["LetraODigito"],["LetraODigito"],    null, null],
    "RA":  [[",","SM","RA"], null,null,null,       null,         null,    null,    null, [",","SM","RA"]],
    "F":   [null, null,        null,  null,       ["C",":","D",";"],null, null,    null, null],
    "C":   [null, null,        null,  null,       ["aceptacion"],null,    null,    null, null],
    "D":   [null, null,        null,  null,       null,          null,    ["Digito"],null, null],
}


function NoTerminal(s){
    const terminales = ["S","A","V","B","AL","G","SM","RA","F","C","D"];
    return !(terminales.indexOf(s) === -1);
}

function getData(data){
    let datos
    if(tabla.hasOwnProperty(data)){
        datos = tabla[data].filter(item => item !== null)[0];
        return datos
    }
}

export function validarSintaxis(sintaxi){
    let stack = ["$", "S"];
    let stringStack = sintaxi.match(/([a-zA-Z_]\w*|\S)/g).toString().split(",");
    console.log("* La pila es:", stack.toString());
    console.log("* La cadena a evaluar es:", stringStack);
    console.log("------------------------------------")

    //------------------Logica--------------------
    while(stack.length > 0){
        let x = stack.pop();
        console.log(" 1 Elemento tope de la pila es: ", x);
        console.log("------------------------------------")

        if(x === "$"){
            console.log("Cadena finalizado - Cadena valida");
            Swal.fire({
                icon: "success",
                title: "Congrats...",
                footer: "Cadena finalizada en estado de aceptación",
                text: `Cadena ${sintaxi} Valida`,
                background: "#131313",
                color: "#fff",
                confirmButtonColor: "#850287",
                iconColor: "#850287"
            });
        } else if (NoTerminal(x)) {
            console.log(x, " es un no terminal");
            const producto = getData(x);
            if(producto){
                for (let i = 0; i <= producto.length-1; i++) {
                    console.log("p:",producto[i])
                    stack.push(producto[i])
                }
                console.log("La nueva pila es: ", stack.toString());
            } else {
                console.log("No se pudo encontrar produccion");
                console.log("La pila quedo asi : ", stack.toString());
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cadena Invalida, elementos faltantes!',
                    background: "#2c2c2c",
                    color: "#fff",
                    confirmButtonColor: "#850287",
                    iconColor: "#850287"
                })
                alert("ACABO EJECUCIÓN YA QUE NO HAY PRODUCCION ---- 1")
                return; //Para terminar la ejecución ya que no hay producción
            }
        } else {
            console.log (x , " es un terminal");
            let y = stringStack.pop();
            console.log(" 2 El elemento tope de la cadena es : ", y);

            // Validacion a..z y 0..9
            if ( x === y || (x === "Letra" && /^[a-z]+$/.test(y)) || (x === "Digito" && /^[0-9]+$/.test(y)) || x === "LetraODigito" && /^[a-z0-9]+$/.test(y)) {
                console.log("Sintaxis valida entre pila y cadena ------ Paso el a...z y 0..9");
            } else {
                console.log("Sintaxis inválida entre pila y cadena");
                console.log("La pila queda así:", stack.toString());
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    background: "#2c2c2c",
                    color: "#fff",
                    confirmButtonColor: "#850287",
                    iconColor: "#850287"

                })
                return;
            }
        }

    }
}



