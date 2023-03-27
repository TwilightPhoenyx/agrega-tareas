import { useState } from 'react';

import styles from "./CreateTask.module.css";


function CreateTask({updateDataFunction}) {

    const [taskDescription, setTaskDescription] = useState("");
  
    function handlerInputDescription(event){
      setTaskDescription(event.target.value);
    };
  
    function handlerClickAddTaskButton(event){
      if (taskDescription !== ""){
        uploadData();
      } else {
        alert("Tarea vacía! Por favor, escriba una tarea")
      }
    };

    function uploadData() {
          fetch(
            "http://localhost:8000/tarefa/",
            {
              method: "POST",
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(
                {
                  descripcion: taskDescription,
                  completada: false,
                }
              ),

            }
        )
        .then(responseCallback)
        .catch(errorCallback)
    };


    function responseCallback (response) {
      if (response.ok){
        setTaskDescription("");
        updateDataFunction();
      } else {
        alert(`Peticion de conexión rechazada: ERROR ${response.status}`);
      }
    };

    function errorCallback(error) {
      alert("Error al cargar los datos. Intentélo más tarde");
    };
    
    return(
      <div>
        <input className={styles.textInput} type="text" placeholder="Escribe nueva tarea aquí" onInput={handlerInputDescription} value={taskDescription}/>
        <button onClick={handlerClickAddTaskButton}> ➕ </button>
      </div>
    );
  
  }
  
  export default CreateTask;