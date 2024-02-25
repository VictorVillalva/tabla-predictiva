function isNoTerminal(symbol){
    const terminales =["S","I","V","T","G","N","R","O","P","F","L"]
    return !(terminales.indexOf(symbol) === -1)
}
const  grammar ={
    "S":["I", "V", "F"],
    "I":["{"],
    "V":["var","T","G"],
    "T":["TD"],
    "G":["N","=","O"],
    "N":["word"],
    "R":["word"],
    "O":["takeData", "P"],
    "P":["(",")"],
    "F":["}"],
    "L":["word"],
}

const tablaPredictiva= {
    "SNT":[ "var", "TD", "{", "}", "()", "word", "takeData", "="],
    "S": [ null, null, "S", null, null, null, null, null ],
    "I": [ null, null, "I", null, null, null, null, null ],
    "V": [ "V", null, null, null, null, null, null, null ],
    "T": [ null, "T", null, null, null, null, null, null ],
    "G": [ null, null, null, null, null, "G", null, null ],
    "N": [ null, null, null, null, null, "N", null, null ],
    "R": [ null, null, null, null, null, "R", null, "R" ],
    "O": [ null, null, null, null, null, null, "O", null ],
    "P": [ null, null, null, null, "P", null, null, null ],
    "F": [ null, null, null, "F", null, null, null, null ],
    "L": [ null, null, null, null, null, "L", null, null ],
}
function getProduction(element) {
    let production
    if (tablaPredictiva.hasOwnProperty(element)) {
        production =tablaPredictiva[element].filter(item => item !== null)[0];
        if(grammar.hasOwnProperty(production)){
            return grammar[production]
        }
    }
}

function validateSintax(string){
    let stack = ["$", "S"];
    let stringStack = string.match(/([a-zA-Z_]\w*|\S)/g).toString().split(",");
    console.log("La pila es:", stack.toString());
    console.log("La cadena a evaluar es:", stringStack);

    while (stack.length > 0) {
        let x = stack.pop();
        console.log("El elemento de la pila tope es:", x);

        if (x === "$") {
            console.log("Cadena finalizada - cadena valida");
            Swal.fire({
                icon: 'success',
                title: 'Congrats...',
                footer: 'Cadena finalizada en estado de aceptación',
                text: `Cadena ${codeContent} Valida`,
                background: "#131313",
                color: "#fff",
                confirmButtonColor: "#850287",
                iconColor: "#850287"
            });

            return; // Terminar la ejecución ya que la cadena es válida
        } else if (isNoTerminal(x)) {
            console.log(x, "es un no terminal");

            const production = getProduction(x);
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
                    text: 'Cadena Invalida, elementos faltantes!',
                    background: "#2c2c2c",
                    color: "#fff",
                    confirmButtonColor: "#850287",
                    iconColor: "#850287"

                })
                return; // Terminar la ejecución ya que no hay producción
            }
        } else {
            console.log(x, "es un terminal");
            let y = stringStack.pop();
            console.log("El elemento tope de la cadena es:", y);

            if (x === y || (x === "word" && /^[a-z]+$/.test(y)) || (x==="TD" && /^int|float|string$/.test(y))) {
                console.log("Sintaxis válida entre pila y cadena");
            } else {
                console.log("Sintaxis inválida entre pila y cadena");
                console.log("La pila queda así:", stack.toString());
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Cadena Invalida, entre pila y cadena!',
                    background: "#2c2c2c",
                    color: "#fff",
                    confirmButtonColor: "#850287",
                    iconColor: "#850287"

                })
                return; // Terminar la ejecución ya que la cadena es inválida
            }
        }
    }
}