import DeleteTask from "./DeleteTask";
import TaskCheckbox from "./TaskCheckbox";
import TaskDescription from "./TaskDescription";

import styles from "./Task.module.css"
import { useState } from "react";



function Task({taskData, updateDataFunction}){

    let [showInput, setShowInput] = useState(false)

    function handlerClickDescription(event){
        setShowInput(true);
    };

    function hideInput(){
        setShowInput(false)
    };


    return(
            <div onClick={handlerClickDescription}className={
                    [
                        styles.listElement,
                        taskData.completada === true ? styles.taskCompleted : "",
                    ].join(" ")
                }
            >
                <span className={taskData.completada === true ? styles.taskCompletedText : ""}>
                {showInput === false && <span>{taskData.descripcion}</span>}
                {showInput && <TaskDescription 
                                taskData={taskData} 
                                updateDataFunction={updateDataFunction}
                                hideInputFunction={hideInput}
                                />
                }
                </span>
                <div className={styles.editOptions}>
                    <TaskCheckbox taskData={taskData} updateDataFunction={updateDataFunction}/>
                    <DeleteTask taskId={taskData.id} updateDataFunction={updateDataFunction}/>
                </div>
            </div>
                
    );
};

export default Task;