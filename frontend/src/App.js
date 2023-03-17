import { useEffect, useState } from "react";

import LoadTask from "./components/LoadTask";
import CreateTask from "./components/CreateTask";

import loadingGif from "./images/loading-gif.gif"
import alertIcon from "./images/warning-icon.png"
import './App.css';



function App() {

    const [data, setData] = useState([]);
    const [currentProcess, setCurrentProcess] = useState("Iniciando Aplicación...");
    let [currentProcessIcon, setCurrentProcessIcon] = useState(loadingGif);

    useEffect(      //cargado automático inical
      updateData,
      []
    );

    function handlerClickUpdate(){      //cargado manual
      updateData()
    };
    
    function updateData(){
    setCurrentProcess("Cargando la lista de tareas...");
    setCurrentProcessIcon(loadingGif);
      fetch("http://localhost:8000/tarefa/")
          .then(responseCallback)
          .catch(errorCallback)
    };

    function responseCallback(response) {
      if (response.ok){
        response.json().then(dataCallback);
      } else {
        alert(`Peticion de conexion rechazada: ERROR ${response.status}`);
      }
      
    };

    function dataCallback(newData) {
        setData(newData);
    };

    function errorCallback(error) {
        setData([]);
        setCurrentProcess("!! No se han podido cargar los datos !!");
        setCurrentProcessIcon(alertIcon);
        //alert("Error de conexión. Intentelo más tarde");
    };
  
  return(
    <main>
      <h1>Gestor de tareas</h1>
      <div className="data-intro">
        <button className="reload-button" onClick={handlerClickUpdate}>↻</button>
        <CreateTask updateDataFunction={updateData}/>
      </div>
      {data.length === 0 && <div className="loadscreen">
                              <p className={currentProcessIcon === alertIcon ? "load-error": ""}>{currentProcess}</p>
                              <img src={currentProcessIcon}/>
                            </div>
      }
      {data.length > 0 && <LoadTask loadedData={data}/>}
    </main>
  );

}

export default App;
