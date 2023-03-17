import { useEffect, useState } from "react";

import LoadTask from "./components/LoadTask";
import CreateTask from "./components/CreateTask";

import './App.css';



function App() {

    const [data, setData] = useState([]);
    const [currentProcess, setCurrentProcess] = useState("Inicializando App");

    /*useEffect(
      updateData,
      []
    );*/

    function handlerClickUpdate(){
      updateData()
    };
    
    function updateData(){
    setCurrentProcess("Cargando la lista de tareas");
      fetch("http://localhost:8000/tarefa/")
          .then(responseCallback)
          .catch(errorCallback)
    };

    function responseCallback(response) {
      if (response.ok){
        response.json().then(dataCallback);
      } else {
        alert(`Peticion de conexion rechazada: Error ${response.status}`);
      }
      
    };

    function dataCallback(newData) {
        setData(newData);
    };

    function errorCallback(error) {
        setData([]);
        alert("Error al cargar los datos. Intentelo más tarde");
        setTimeout(updateData,5000);
    };
  
  return(
    <main>
      <h1>Administrador de tareas</h1>
      <button onClick={handlerClickUpdate}>Actualizar</button>
      <CreateTask updateDataFunction={updateData}/>
      {data.length === 0 && <p>{currentProcess}</p>}
      {data.length > 0 && <LoadTask loadedData={data}/>}
    </main>
  );

}

export default App;
