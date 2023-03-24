import DeleteTask from "./DeleteTask";
import TaskCheckbox from "./TaskCheckbox";
import TaskDescription from "./TaskDescription";

import styles from "./Task.module.css"
import { useState } from "react";



function Task({taskData, updateDataFunction}){

    let [showInput, setShowInput] = useState(false)
    let [shownDescription, setShownDescription] = useState(taskData.descripcion)

    function handlerClickDescription(event){
        setShowInput(true);
        setShownDescription("");
    };

    function hideInput(){
        setShowInput(false)
        setShownDescription(taskData.descripcion);
    };

 


    return(
            <div onClick={handlerClickDescription}className={
                    [
                        styles.listElement,
                        taskData.completada === 1 ? styles.taskCompleted : "",
                    ].join(" ")
                }
            >
                {shownDescription} 
                {showInput && <TaskDescription 
                                taskData={taskData} 
                                updateDataFunction={updateDataFunction}
                                hideInputFunction={hideInput}
                                />
                }
                <div>
                    <TaskCheckbox taskData={taskData} updateDataFunction={updateDataFunction}/>
                    <DeleteTask taskId={taskData.id} updateDataFunction={updateDataFunction}/>
                </div>
            </div>
                
    );
};

export default Task;