import { connectionRequest } from "../lib";

import styles from "./DeleteTask.module.css"

function DeleteTask({taskId, updateDataFunction}) {

  const requestData = {
                        id: taskId
                      }
      
  function handlerClickDeleteButton(){
      deleteData()
  };

  function deleteData() {
      connectionRequest("DELETE", requestData, responseCallback, errorCallback)
  };

  function responseCallback (response) {
    if (response.ok){
      updateDataFunction();
    } else {
      alert(`Peticion de conexión rechazada: ERROR ${response.status}`);
    }
  };

  function errorCallback(error) {
    alert("Error de conexión. Intentélo más tarde");
  };

  return(
    <button onClick={handlerClickDeleteButton}><span className={styles.deleteButton}>❌</span></button>
  );

};

export default DeleteTask