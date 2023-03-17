import styles from "./LoadTask.module.css"

function LoadTask({loadedData}) {

    return(
        <ol className={styles.listContainer}>
        {loadedData.map(
            data=>
            <li className={styles.listElement} key={data.id}>
                {data.descripcion}
                <input type="checkbox" checked={data.rematada}/>
            </li>
            )
        }
        </ol>
    );

}

export default LoadTask;