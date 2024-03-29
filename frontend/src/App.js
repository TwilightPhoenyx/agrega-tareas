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
    let [isLoading, setIsLoading] = useState(false);
    let [isLoadError, setIsLoadError] = useState(false);
    useEffect(      //cargado automático inical
      updateData,
      []
    );

    function handlerClickUpdate(){      //cargado manual
      updateData()
    };
    
    function updateData(){
      setCurrentProcess("");
      setIsLoading(true);
      setIsLoadError(false);
      setCurrentProcessIcon(loadingGif);
      fetch("http://localhost:8000/tarefa/")
          .then(responseCallback)
          .catch(errorCallback)
    };

    function responseCallback(response) {
      if (response.ok){
        response.json().then(dataCallback);
        setIsLoading(false);
      } else {
        alert(`Peticion de conexion rechazada: ERROR ${response.status}`);
      }
      
    };

    function dataCallback(newData) {
        setData(newData);
    };

    function errorCallback(error) {
        setData([]);
        setCurrentProcess("⚠️ Fallo al cargar la lista ⚠️");
        setCurrentProcessIcon(alertIcon);
        setIsLoadError(true);
    };
  
  return(
    <main>
      <h1>Gestor de tareas</h1>
      <div className="data-intro">
        <button className="reload-button" onClick={handlerClickUpdate}>↻</button>
        <CreateTask updateDataFunction={updateData}/>
      </div>
      {isLoading && <div className="loadscreen">
                      <p className={currentProcessIcon === alertIcon ? "load-error": ""}>{currentProcess}</p>
                      <img src={currentProcessIcon} alt=""/>
                      {isLoadError && <button className="retry-button" onClick={handlerClickUpdate}>Reintentar</button>}
                    </div>
      }
      <LoadTask loadedData={data} updateDataFunction={updateData}/>
    </main>
  );

}

export default App;
