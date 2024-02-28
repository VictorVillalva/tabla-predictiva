# Tabla Predictiva

Desarrollar de programa que simula funciones de un analizador sintáctico implementando el [Metodo Descendente](https://www.uco.es/users/ma1fegan/2015-2016/pl-grado/temas/Tema-4.pdf): Predictivo No Recursivo.



## Explicaciones lineas de codigo
### Obtener los datos de la tabla y validar que cuenta con la propiedad
```javascript
function getData(data){
    let datos
    if(tabla.hasOwnProperty(data)){
        datos = tabla[data].filter(item => item !== null)[0];
        return datos
    }
}
```

```javascript 
hasOwnProperty()
``` 
Es un método de los objetos en JavaScript que devuelve ` true`  si el objeto tiene una propiedad con el nombre especificado.

### Verificacion de sintaxis entre un simbolo de la pila y el elemento superior de la cadena
```javascript
if ( x === y 
    || (x === "letraOnumero" && /^[a-z0-9]$/.test(y)) 
    || (x === "numero" &&/^[0-9]$/.test(y))) {
    
        console.log("Sintaxis válida entre pila y cadena");
        console.log("Tamaño pila: ",pila.length)
        console.log("Tamaño de Sintaxi: ", sintaxiString.length)
    }
```

```javascript 
(x === "letraOnumero" && /^[a-z0-9]$/.test(y))
``` 
Aquí, si el valor de x es igual a "letraOnumero" y el valor de y contiene solamente letras minúsculas o números, entonces se considera una sintaxis válida. Si llevara el signo (+) ```/^[a-z0-9]$+/``` puede aceotar mas de dos letras o dos numeros

```javascript 
(x === "numero" &&/^[0-9]$/.test(y)
``` 
Si el valor de x es igual a "numero" y el valor de y es un solo dígito, entonces también es considerado válido.

## Para recordar
```javascript
[1,2,3].pop(); //? [1,2] * 
[1,2,3].push(4); //? [1,2,3,4] * 
```

## Cadena de pruebas
1. automata alfabeto : g , p ; aceptacion : 9 ; fin
2. automata alfabeto : 1 , 2 ; aceptacion : 1 ; fin
3. automata alfabeto : h , h , h , h , h ; aceptacion : 9 ; fin
4. automata alfabeto : 1 , 2 , 3 , 4 , 5 ; aceptacion : 9 ; fin


