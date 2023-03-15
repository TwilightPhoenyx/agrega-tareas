import { useState } from 'react';


function CreateTask() {

    let [taskDescription, setTaskDescription] = useState("");
    let [isTaskCompleted, setIsTaskCompleted] = useState(false);
    let [taskId, setTaskId] = useState(2);
  
    function handlerInputDescription(event){
      setTaskDescription(event.target.value);
    };
  
    function handlerCheckbox(event){
      setIsTaskCompleted(event.target.checked);
    };
  
    function handlerUpdateButton(event){
      setTaskId(taskId + 1);
    };
    
    return(
      <div>
        <label>Descripcion de tarea: 
          <input type="text" onChange={handlerInputDescription}/>
        </label>
        <label>Completada
          <input type="checkbox" name="isCompleted" onChange={handlerCheckbox}/>
        </label>
        <button onClick={handlerUpdateButton}>Actualizar</button>
      </div>
    );
  
  }
  
  export default CreateTask;