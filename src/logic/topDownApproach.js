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
    "RA":[[",","SM"], null, null, null, null, null, null, null,[",","SM"]],
    "F":[null, null, null, null, ["C",":","D",";"], null, null, null, null],
    "C":[null, null, null, null, ["aceptacion"], null, null, null, null],
    "D":[null, null, null, null, null, null, ["numero"], null, null],
}

// Comprobacion si un símbolo es  no terminal en función de los símbolos definidos en el array
function NoTerminal(s){
    const terminales = ["S","A","V","B","AL","G","SM","RA","F","C","D"];
    return !(terminales.indexOf(s) === -1);
}

// Ayuda a obtener los datos de la tabla declarada y valir que cuenta con la propiedad usando el metodo hasOwnProperty
function obtenerProduccion(noTerminal){
    let datos
    if(tabla.hasOwnProperty(noTerminal)){
        datos = tabla[noTerminal].filter(item => item !== null)[0];
        return datos
    }
}



export function validarSintaxis(sintaxi){

    let pila = ["$", "S"];
    let stringPila = sintaxi.split(" ")

    // console.log("* Pila:", pila.toString());
    // console.log("* Cadena a evaluar es:", stringPila);


    while (pila.length > 0) {
        let x = pila.pop();
        console.log("El elemento de la pila tope es:", x);

        if (x === "$") {
            console.log("Cadena finalizada - Cadena valida");
            Swal.fire({
                icon: "success",
                title: "Validación Exitosa",
                footer: "Cadena finalizada en estado de aceptación",
                text: `Cadena : ${sintaxi} `,
                background: "#131313",
                color: "#fff",
                confirmButtonColor: "#1a9a77",
                iconColor: "#1a9a77"
            });

            return; // Terminar la ejecución ya que la cadena es válida

        } else if (NoTerminal(x)) {
            // X es un No Terminal
            console.log(x, " -- es un no terminal");

            const produccion = obtenerProduccion(x);
            if (produccion) {

                for (let i=0; i<=produccion.length-1;i++){
                    pila.push(produccion[i])
                }

                console.log("La nueva pila es:", pila.toString());

            } else {
                console.log("No se pudo encontrar producción");
                console.log("La pila quedó así: ", pila.toString());
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
            let y = stringPila.pop();
            console.log("El elemento tope de la cadena es: ", y);

            //Verificacion de sintaxis entre un simbolo de la pila y el elemento superior de la cadena
            if ( x === y ||
                (x === "letraOnumero" && /^[a-z0-9]+$/.test(y)) ||
                (x === "numero" &&/^[0-9]$/.test(y))) {

                console.log("Sintaxis válida entre pila y cadena");
                console.log("Tamaño pila: ",pila.length)
                console.log("Tamaño de Sintaxi: ", stringPila.length)

                if(pila.length === 4 && stringPila.length > 3 && pila[pila.length-1] === ":"){
                    console.error("Agregando")
                    pila.push("SM")
                    pila.push(",")

                }

            } else {
                console.log("Sintaxis inválida entre pila y cadena");
                console.log("La pila queda así:", pila.toString());
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



