import { useEffect, useState } from "react"
import CreateTask from "./CreateTask";

function LoadTask() {

    const [data, setData] = useState([]);
    let [lastId, setLastId] = useState(0);
    
    useEffect(
        ()=> {
            fetch("http://localhost:8000/tarefa/").then(responseCallback)
            },
        []
    );

    useEffect(
        ()=> {
            loadLastId()
            console.log(lastId)
        },
        [data]
    );


    function responseCallback(response) {
        const dataPromise = response.json();
        dataPromise.then(dataCallback);
    };

    function dataCallback(newData) {
        setData(newData);
    };

    function loadLastId(){
        setLastId(data[data.length-1]?.id)
    }
    

    return(
        <>
            {data.map(
                (task)=>
                    <p key={task.id}>{task.id}{task.descripcion}{String(task.rematada)}</p>
                
            )
            }
            <CreateTask/>
        </>
    );

}

export default LoadTask;