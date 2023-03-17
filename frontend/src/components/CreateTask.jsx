import { useState } from 'react';


function CreateTask({updateDataFunction}) {

    const [taskDescription, setTaskDescription] = useState("");
  
    function handlerInputDescription(event){
      setTaskDescription(event.target.value);
    };
  
    function handlerClickAddTaskButton(event){
      fetch(
          "http://localhost:8000/tarefa/",
          {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                id: Date.now(),
                descripcion: taskDescription,
                rematada: false,
              }
            ),

          }
      )
      .then(responseCallback)
      .catch(errorCallback)
    }

    function responseCallback (response) {
      if (response.ok){
        setTaskDescription("");
        //updateDataFunction();
        alert("Tarea añadida con éxito");
      } else {
        alert(`Peticion de conexión rechazada: Error ${response.status}`);
      }
    };

    function errorCallback(error) {
      alert("Error al cargar los datos. Intentélo más tarde");
    };
    
    return(
      <div>
        <input type="text" placeholder="Escribe nueva tarea aquí" onInput={handlerInputDescription}/>
        <button onClick={handlerClickAddTaskButton}> + </button>
      </div>
    );
  
  }
  
  export default CreateTask;