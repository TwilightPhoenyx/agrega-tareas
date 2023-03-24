import { useEffect, useState } from "react";

function TaskDescription({taskData, updateDataFunction, hideInputFunction}){

    const [descriptionText, setDescriptionText] = useState(taskData.descripcion)
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
          "http://localhost:8000/tarefa/",
          {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                        {
                        id: taskData.id,
                        descripcion: descriptionText,
                        completada: taskData.completada
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
        <input type="text" 
            autoFocus={true} 
            onChange={handlerModifyDescription} 
            onBlur={handlerLeaveInput} 
            defaultValue={descriptionText}
        />
    );
 
};

export default TaskDescription;