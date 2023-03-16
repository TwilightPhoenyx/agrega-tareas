import { useState } from 'react';


function CreateTask({loadedId}) {

    let [taskDescription, setTaskDescription] = useState("");
    let [isTaskCompleted, setIsTaskCompleted] = useState(false);
    let [taskId, setTaskId] = useState(0);
  
    function handlerInputDescription(event){
      setTaskDescription(event.target.value);
    };
  
    function handlerCheckbox(event){
      setIsTaskCompleted(event.target.checked);
    };
  
    function handlerUpdateButton(event){
      setTaskId(loadedId + 1);
      console.log(taskId);
    };
    
    return(
      <div>
        <label>Descripcion de tarea: 
          <input type="text" onChange={handlerInputDescription}/>
        </label>
        <label>Completada
          <input type="checkbox" name="isCompleted" onChange={handlerCheckbox}/>
        </label>
        <button onClick={handlerUpdateButton}>Subir Tarea</button>
      </div>
    );
  
  }
  
  export default CreateTask;