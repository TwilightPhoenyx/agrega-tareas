import { useEffect, useState } from "react";

function ChangeCheckTask({taskData, updateDataFunction}){

    const [isChecked, setIsChecked] = useState(taskData.rematada)
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
          "http://localhost:8000/tarefa/",
          {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                id: taskData.id,
                descripcion: taskData.descripcion,
                rematada: isChecked
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
    alert("Error al cargar los datos. Intentélo más tarde");
  };



  return(
      <input type="checkbox" defaultChecked={taskData.rematada} onClick={handlerCompletedCheckbox}/>
  );
    
};

export default ChangeCheckTask;