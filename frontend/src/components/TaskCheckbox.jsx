import { useEffect, useState } from "react";

function TaskCheckbox({taskData, updateDataFunction}){

    const [isChecked, setIsChecked] = useState(taskData.completed)
    const [isNotFirstRender, setIsNotFirstRender] = useState(false);


    function handlerCompletedCheckbox(event){
        setIsChecked(!isChecked)
        setIsNotFirstRender(true);
    };

    useEffect(
        ()=>{ 
        isNotFirstRender && updateCheckbox();
        },
        [isChecked]
      );

    function updateCheckbox() {
        fetch(
          "http://localhost:8000/task/",
          {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                id: taskData.id,
                description: taskData.description,
                completed: isChecked
              }
            ),

          }
      )
      .then(responseCallback)
      .catch(errorCallback)
  };


  function responseCallback (response) {
      if (response.ok){
        updateDataFunction();
      } else {
        alert(`Peticion de conexión rechazada: ERROR ${response.status}`);
      }
  };

  function errorCallback(error) {
      alert("Error de conexión. Intentélo más tarde");
  };



  return(
      <input type="checkbox" defaultChecked={taskData.completed} onClick={handlerCompletedCheckbox}/>
  );
    
};

export default TaskCheckbox;