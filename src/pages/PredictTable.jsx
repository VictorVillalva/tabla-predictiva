import '../assets/styles/predictTable.css'
import {validarSintaxis} from "../logic/topDownApproach.js";
import {useEffect} from "react";

export default function PredictTable() {
    const [contenido, setContenido] = useState("");
    const [infoStack, setInfoStack] = useState([]);


    useEffect(() => {
        const originalConsoleLog = console.log;
        console.log = (...args) => {
            originalConsoleLog(...args);
            setInfoStack(prevLogs => [...prevLogs, args.join(' ')]);
        };
        return () => {
            console.log = originalConsoleLog;
        };
    }, []);

    const handlerCodeText=(e) =>{
        setContenido(e.target.value)
    }
    const handleCheck = (e) =>{
        e.preventDefault();
        setInfoStack([])
        validarSintaxis(contenido)
    }
    return (
        <>
            <header>
                <section className="section-header">
                    <h1>Tabla Predictiva</h1>
                    <p>Ingrese los datos necesarios para iniciar la validación</p>
                </section>
            </header>
            <section className="section1">
                <div className="datos">
                    <textarea className="Data"/>
                    <button className="analizar">Analizar</button>
                    <button className="limpiar">Analizar</button>
                </div>
                <div className="view-data"></div>
            </section>
        </>
    )
}
