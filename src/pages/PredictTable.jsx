import '../assets/styles/predictTable.css'
export default function PredictTable() {
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
                    <input type="text" className="Data"/>
                    <button className="analizar">Analizar</button>
                    <button className="limpiar">Analizar</button>
                </div>
                <div className="view-data"></div>
            </section>
        </>
    )
}
