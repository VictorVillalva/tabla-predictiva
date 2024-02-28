import '../assets/styles/predictTable.css'
import {validarSintaxis} from "../logic/topDownApproach.js";
import {useEffect, useState} from "react";

export default function PredictTable() {
    const [cadena, setCadena] = useState("")
    const [stackInfo, setStackInfo] = useState([])

    useEffect(() => {
        const consoleLogsJS = console.log
        console.log = (...args) => {
            consoleLogsJS(...args)
            setStackInfo(prevLogs => [...prevLogs, args.join(' ')]);
        };
        return () => {
             console.log = consoleLogsJS;
        };
    }, []);

    const handlerCadena = (event) => {
        setCadena(event.target.value)
    }

    const handlerValidar = (event) => {
        event.preventDefault();
        setStackInfo([])
        validarSintaxis(cadena)
    }

    const limpiarCandena = () =>{
        setStackInfo([])
    }

    return (
        <>
            <header>
                <section className="section-header">
                    <h1 className="title">Tabla Predictiva</h1>
                    <p className="subtitle">Ingrese los datos necesarios para iniciar la validación</p>
                </section>
            </header>
            <section className="section1">
                <div className="sintaxis">
                    <input type="text" className="cadena" id="inputCadena" onChange={handlerCadena} value={cadena}
                           placeholder='automata alfabeto : gato , perro ; aceptacion : 9 ; fin'/>
                    <button className="analizar" id="btnValidar" onClick={handlerValidar}>Analizar</button>
                    <button className="limpiar" onClick={limpiarCandena}>Limpiar</button>
                </div>
                <div className="regreso-pila">
                    <span className="txt-analisis">| Analisis</span>
                    <textarea className="resultado-pila" value={stackInfo.join('\n')}></textarea>
                </div>
            </section>
        </>
    )
}
