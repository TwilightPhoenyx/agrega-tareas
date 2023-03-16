import { useEffect, useState } from "react"
import CreateTask from "./CreateTask";

function LoadTask() {

    const [data, setData] = useState([]);
    const [taskList, setTaskList] = useState([]);
    const [currentProcess, setCurrentProcess] = useState("Inicializando App")

    
    useEffect(
        updateData,
        []
    );

    useEffect(
        ()=> {
            const loadNewTaskList = data.map(taskHTML);
            setTaskList(loadNewTaskList);
        },
        [data]
    );

    function updateData(){
        setCurrentProcess("Cargando la lista de tareas");
        fetch("http://localhost:8000/tarefa/")
            .then(responseCallback)
            .catch(errorCallback)
    };

    function responseCallback(response) {
        const dataPromise = response.json();
        dataPromise.then(dataCallback);
    };

    function dataCallback(newData) {
        setData(newData);
    };

    function errorCallback(error) {
        setData([]);
        setCurrentProcess("Error al cargar los datos. Intentelo más tarde");
        setTimeout(updateData,5000);
    };


    function taskHTML(task){
        return(
                <label key={task.id}>{task.descripcion}: 
                    <input type="checkbox" checked={task.rematada}/>
                </label>
        );
    };


    return(
        <>
        {data.length === 0 && <p>{currentProcess}</p>}
        {data.length > 0 && taskList}
        {/*<CreateTask loadedId={lastId}/>*/}
        </>
    );

}

export default LoadTask;