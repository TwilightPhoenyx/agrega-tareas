import { useEffect, useState } from "react";
import { connectionRequest } from "../lib";

function TaskCheckbox({taskData, updateDataFunction}){

    const [isChecked, setIsChecked] = useState(taskData.completed);
    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const requestData = {
                          id: taskData.id,
                          description: taskData.description,
                          completed: isChecked
                        }


    function handlerCompletedCheckbox(event){
        setIsChecked(!isChecked);
        setIsNotFirstRender(true);
    };

    useEffect(
        ()=>{ 
        isNotFirstRender && updateCheckbox();
        },
        [isChecked]
      );

    function updateCheckbox() {
          connectionRequest("PUT", requestData, responseCallback, errorCallback)
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