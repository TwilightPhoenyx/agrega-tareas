import Task from "./Task";

import styles from "./LoadTask.module.css"

function LoadTask({loadedData, updateDataFunction}) {


    return(
        <ol className={styles.listContainer}>
        {loadedData.map(
            data=><li key={data.id}>
                <Task taskData={data} updateDataFunction={updateDataFunction}/>
            </li>
            )
        }
        </ol>
    );

}

export default LoadTask;