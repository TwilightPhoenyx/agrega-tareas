import DeleteTask from "./DeleteTask";
import ChangeCheckTask from "./ChangeCheckTask";

import styles from "./Task.module.css"


function Task({taskData, updateDataFunction}){
    return(
                <div className={
                        [
                            styles.listElement,
                            taskData.rematada === true ? styles.taskCompleted : "",
                        ].join(" ")
                    }
                >
                    {taskData.descripcion}
                    <div>
                        <ChangeCheckTask taskData={taskData} updateDataFunction={updateDataFunction}/>
                        <DeleteTask taskId={taskData.id} updateDataFunction={updateDataFunction}/>
                    </div>
                </div>
                
    );
};

export default Task;