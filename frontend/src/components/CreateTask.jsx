import { useState } from 'react';
import { connectionRequest } from '../lib';

import styles from "./CreateTask.module.css";


function CreateTask({updateDataFunction}) {

    const [taskDescription, setTaskDescription] = useState("");
    const requestData =  {
                            description: taskDescription,
                            completed: false
                         }
     
    
  
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

    function uploadData(){
      connectionRequest("POST", requestData, responseCallback, errorCallback)
    }

    function responseCallback (response) {
      if (response.ok){
        setTaskDescription("");
        updateDataFunction();
      } else {
        alert(`Peticion de conexión rechazada: ERROR ${response.status}`);
      }
    };

    function errorCallback(error) {
      alert("Error de conexión. Intentélo más tarde");
    };
    
    return(
      <div>
        <input 
            className={styles.textInput} 
            type="text" 
            spellCheck={false} 
            placeholder="Escribe nueva tarea aquí" 
            onInput={handlerInputDescription} 
            value={taskDescription}
        />
        <button onClick={handlerClickAddTaskButton}> ➕ </button>
      </div>
    );
  
  }
  
  export default CreateTask;