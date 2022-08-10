import { useState, useEffect } from "react"
import axios from "axios"

const Tabla = () => {

    const [datos, setDatos] = useState({})
    const [paginacion, setPaginacion] = useState({})
    const [modal, setModal] = useState(false)
    const [condiciones, setCondiciones] = useState({})
    const [id, setId] = useState(0)
    
    useEffect(() => {
        const obtenerDatosClick = async() =>{
            const {data} = await axios.get('https://api.datos.gob.mx/v1/condiciones-atmosfericas')
            const condicionesNueva = data.results.filter(( d => d._id === id))

            setCondiciones(condicionesNueva)
        }
        obtenerDatosClick()
    }, [modal])

    
    


    useEffect(() => {
        const obtenerDatos = async() =>{
            const {data} = await axios.get('https://api.datos.gob.mx/v1/condiciones-atmosfericas')
            setDatos(data.results)



            
            setPaginacion(data.pagination)
        }
        obtenerDatos()
    }, [])


    const colocarModar = () => {
        setTimeout(() => {
            
        }, 2000);
    }
    

  return (
    <>
        { datos.length > 1 && (
        <table>
            <thead>
                <tr>
                    <td>_id</td>
              
                    <td>cityid</td>
             
                    <td>name</td>
              
                    <td>state</td>
               
                    <td>probabilityofprecip</td>
               
                    <td>relativehumidity</td>
                
                    <td>Last reporttimeformato(YYYY/MM/DD)</td>
                
                    <td>Llueve</td>
                </tr>
            </thead>
            <tbody>
                
            {datos.map( (dato) => (
                        <tr key={dato._id}>
                            <td onClick={() => {setModal(!modal), setId(dato._id)}}>
                                {dato._id}
                            </td>
                            <td>
                                {dato.cityid}
                            </td>
                            <td>
                                {dato.name}
                            </td>
                            <td>
                                {dato.state}
                            </td>
                            <td>
                                {dato.probabilityofprecip}
                            </td>
                            <td>
                                {dato.relativehumidity}
                            </td>
                            <td>
                                {new Date(dato['date-insert']).toLocaleDateString('en-us', { year:"numeric", month:"short", day:"numeric"})} 
                            </td>
                            { dato.probabilityofprecip > 60 || dato.relativehumidity > 50 ? <td>Si</td> : <td>no</td> }
                        </tr>
                    ))}
            
            

                
            </tbody>
        </table>
)}

   <p>Total de datos: {datos.length}</p>

    {modal && (

            <div className="modal" onClick={() => {setModal(!modal)}}>

                <div className="contenido">
                    <p>id = {condiciones?.id}</p>
                    <p>validdateutc = {condiciones?.validdateutc}</p>
                    <p>winddirectioncardinal = {condiciones?.winddirectioncardinal}</p>
                    <p>probabilityofprecip = {condiciones.probabilityofprecip}</p>
                    <p>relativehumidity = {condiciones.relativehumidity}</p>
                    <p>name = {condiciones.name}</p>
                    <p>longitude = {condiciones.longitude}</p>
                    <p>state = {condiciones.state}</p>
                    <p>lastreporttime = {condiciones.lastreporttime}</p>
                    <p>skydescriptionlong = {condiciones.skydescriptionlong}</p>
                    <p>stateabbr = {condiciones.stateabbr}</p>
                    <p>tempc = {condiciones.tempc}</p>
                    <p>latitude = {condiciones.latitude}</p>
                    <p>iconcode = {condiciones.iconcode}</p>
                    <p>windspeedkm = {condiciones.windspeedkm}</p>
                </div>
                



            </div>
    ) }
    </>
  )
}
export default Tabla