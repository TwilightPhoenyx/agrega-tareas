import { useEffect, useState } from "react";

function TaskDescription({taskData, updateDataFunction, hideInputFunction}){

    const [descriptionText, setDescriptionText] = useState(taskData.description)
    const [isNotFirstRender, setIsNotFirstRender] = useState(false);


    function handlerModifyDescription(event){
        setDescriptionText(event.target.value);
        setIsNotFirstRender(true);
    };

    function handlerLeaveInput(event){
        hideInputFunction();
    };

    useEffect(
        ()=>{ 
        isNotFirstRender && updateDescription();
        },
        [descriptionText]
      );

    function updateDescription() {

        fetch(
          "http://localhost:8000/task/",
          {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(
                {
                  id: taskData.id,
                  description: descriptionText,
                  completed: taskData.completed
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
        <input type="text" 
            autoFocus={true}
            spellCheck={false} 
            onChange={handlerModifyDescription} 
            onBlur={handlerLeaveInput} 
            defaultValue={descriptionText}
        />
    );
 
};

export default TaskDescription;