import express from "express"
import cors from "cors"
import { Sequelize, DataTypes } from "sequelize";

const app = express()
app.use(cors())
app.use(express.json())


const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});


const Tarefa = sequelize.define('Tarefa', {
    descripcion: {
      type: DataTypes.STRING
    },
    completada: {
      type: DataTypes.BOOLEAN
    }
});

await sequelize.sync({ alter: true })

app.get("/tarefa/", async (_, respuesta)=>{
    try {
        const todasAsTarefas = await Tarefa.findAll()
        respuesta.setHeader("Content-Type", "application/json")
        respuesta.status(200)
        respuesta.send(JSON.stringify(todasAsTarefas))
    } catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }
    
})


app.post("/tarefa/", async (peticion, respuesta)=>{
    try {
        const tarefa = await Tarefa.create(peticion.body)
        respuesta.setHeader("Content-Type", "application/json")
        respuesta.status(201)
        respuesta.send(tarefa.toJSON())
    } catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }
})


app.delete("/tarefa/", async (peticion, respuesta)=>{
    try {
        const tarefa = await Tarefa.findByPk(peticion.body.id)
        await tarefa.destroy()
        respuesta.status(200)
        respuesta.send("Ok")        
    } catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }
})


app.put("/tarefa/", async (peticion, respuesta)=>{
    try {
        const tarefa = await Tarefa.findByPk(peticion.body.id)
        await tarefa.update(peticion.body)
        respuesta.status(200)
        respuesta.send("Ok")        
    } catch (error) {
        respuesta.status(500)
        respuesta.send('Error.')
    }
})


app.listen( 8000,()=>{
    console.log("Express traballando...");
})
