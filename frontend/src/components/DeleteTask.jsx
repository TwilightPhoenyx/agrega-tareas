import styles from "./DeleteTask.module.css"

function DeleteTask({taskId, updateDataFunction}) {


    function handlerClickDeleteButton(){
        deleteData()
    };

    function deleteData() {
        fetch(
          "http://localhost:8000/tarefa/",
          {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
              {
                id: taskId
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
    <button onClick={handlerClickDeleteButton}><span className={styles.deleteButton}>❌</span></button>
  );

};

export default DeleteTask