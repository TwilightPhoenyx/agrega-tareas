import styles from "./LoadTask.module.css"

function LoadTask({loadedData}) {

    return(
        <ol className={styles.listContainer}>
        {loadedData.map(
            data=>
            <li key={data.id}>
                <div className={
                        [
                            styles.listElement,
                            data.rematada === true ? styles.taskCompleted : "",
                        ].join(" ")
                    }
                >
                    {data.descripcion}
                    <input type="checkbox" checked={data.rematada}/>
                </div>
            </li>
            )
        }
        </ol>
    );

}

export default LoadTask;