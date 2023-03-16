import LoadTask from "./components/LoadTask";
import './App.css';
import { useState } from "react";

function App() {

  //const [data, setData] = useState([]);
  //const [process, setProcess] = useState("Iniciando App");
  
  return(
    <div>
      <h1>Lista de tareas</h1>
          <LoadTask/>
    </div>
  );

}

export default App;
