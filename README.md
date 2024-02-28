# Tabla Predictiva

Desarrollar de programa que simula funciones de un analizador sintáctico implementando el método descendente: Predictivo No Recursivo.



## Explicaciones lineas de codigo

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



