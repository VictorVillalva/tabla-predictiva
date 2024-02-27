import Swal from 'sweetalert2';

//Generar tabla predictiva de actividad
const tabla = {
    "SNT": [",", "automata", "fin", "alfabeto", "aceptacion", "letraOnumero", "numero", ":", ";"],
    "S":[null, ["A","B","V"], null, null, null, null, null, null, null],
    "A":[null, ["automata"], null, null, null, null, null, null, null],
    "V":[null, null, ["fin"], null, null, null, null, null, null],
    "B":[null, null, null, ["AL", "F"], null, null, null, null, null],
    "AL":[null, null, null, ["G",":","SM","RA",";"], null, null, null, null, null],
    "G":[null, null, null, ["alfabeto"], null, null, null, null, null],
    "SM":[null, null, null, null, null, ["letraOnumero"], null, null, null],
    "RA":[[",","SM"], null, null, null, null, null, null, null, [",","SM"]],
    "F":[null, null, null, null, ["C",":","D",";"], null, null, null, null],
    "C":[null, null, null, null, ["aceptacion"], null, null, null, null],
    "D":[null, null, null, null, null, null, ["numero"], null, null],
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
    //let sintaxiString = string.match(/([a-zA-Z_]\w*|\S)/g).toString().split(",");
    let sintaxiString = sintaxi.split(" ")
    console.log("* Pila:", stack.toString());
    console.log("* Cadena a evaluar es:", sintaxiString);

    while (stack.length > 0) {
        let x = stack.pop();
        console.log("El elemento de la pila tope es:", x);

        if (x === "$") {
            console.log("Cadena finalizada - Cadena valida");
            Swal.fire({
                icon: "success",
                title: "Validación Exitosa",
                footer: "Cadena finalizada en estado de aceptación",
                text: `Cadena : ${sintaxi} | Valida`,
                background: "#131313",
                color: "#fff",
                confirmButtonColor: "#1a9a77",
                iconColor: "#1a9a77"
            });

            return; // Terminar la ejecución ya que la cadena es válida
        } else if (NoTerminal(x)) {
            console.log(x, " -- es un no terminal");

            const production = getData(x);
            if (production) {

                for (let i=0; i<=production.length-1;i++){
                    stack.push(production[i])
                }
                console.log("La nueva pila es:", stack.toString());
            } else {
                console.log("No se pudo encontrar producción");
                console.log("La pila quedó así:", stack.toString());
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cadena Invalida, elementos faltantes',
                    background: "#2c2c2c",
                    color: "#fff",
                    confirmButtonColor: "#1a9a77",
                    iconColor: "#1a9a77"

                })
                return; // Terminar la ejecución ya que no hay producción
            }
        } else {
            console.log(x, "es un terminal");
            let y = sintaxiString.pop();
            console.log("El elemento tope de la cadena es:", y);


            if (x === y || (x === "letraOnumero" && /^[a-z0-9]+$/.test(y)) || (x==="numero" &&/^[0-9]$/.test(y) )) {
                console.log("Sintaxis válida entre pila y cadena");
                console.log("sl: ",stack.length)
                console.log("ssl: ", sintaxiString.length)

            } else {
                console.log("Sintaxis inválida entre pila y cadena");
                console.log("La pila queda así:", stack.toString());
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cadena Invalida, entre pila y cadena',
                    background: "#2c2c2c",
                    color: "#fff",
                    confirmButtonColor: "#1a9a77",
                    iconColor: "#1a9a77"

                })
                return; // Terminar la ejecución ya que la cadena es inválida
            }
        }
    }
}



