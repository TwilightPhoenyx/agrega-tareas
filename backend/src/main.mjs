import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const tarefas = [
    {
        id: 0,
        descripcion: "Unha tarefa de exemplo",
        rematada: true,
    },
    {
        id: 1,
        descripcion: "Outra tarefa de exemplo",
        rematada: false,
    },
]

app.get("/", (_, respuesta)=>{
    respuesta.status(200)
    respuesta.send("¡¡¡Funciono!!!")
})

app.post("/tarefa/", (peticion, respuesta)=>{
    tarefas.push(peticion.body)
    respuesta.status(200)
    respuesta.send("Ok")
})

app.get("/tarefa/", (_, respuesta)=>{
    respuesta.status(200)
    respuesta.send(JSON.stringify(tarefas))
})

app.delete("/tarefa/", (peticion, respuesta)=>{
    let index = tarefas.findIndex(
        task=>{
            return task.id === peticion.body.id
        }
    )
    if (index > -1){
        tarefas.splice(index, 1)
    }
    respuesta.status(200)
    respuesta.send("Ok")
})

app.put("/tarefa/", (peticion, respuesta)=>{
    let index = tarefas.findIndex(
        task=>{
            return task.id === peticion.body.id
        }
    )
    if (index > -1){
        tarefas[index].descripcion = peticion.body.descripcion
        tarefas[index].rematada = peticion.body.rematada
    }
    respuesta.status(200)
    respuesta.send("Ok")
})

app.listen( 8000,()=>{
    console.log("Express traballando...");
})
