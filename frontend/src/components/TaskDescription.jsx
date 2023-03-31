import { useEffect, useState } from "react";
import { connectionRequest } from "../lib";

function TaskDescription({taskData, updateDataFunction, hideInputFunction}){

    const [descriptionText, setDescriptionText] = useState(taskData.description)
    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const requestData =  {
                            id: taskData.id,
                            description: descriptionText,
                            completed: taskData.completed
                         }


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