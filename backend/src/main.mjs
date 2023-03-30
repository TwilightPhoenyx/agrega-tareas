import Database from 'better-sqlite3';
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())


const db = new Database('./db/database.sqlite')
db.pragma('journal_mode = WAL');

db.exec(` 
    CREATE TABLE
        IF NOT EXISTS
        tasks(
            id INTEGER PRIMARY KEY,
            description TEXT NOT NULL,
            completed BOOLEAN NOT NULL
        )
`);

const getAllTasks = db.prepare('SELECT id, description, completed FROM tasks')
const insertTask = db.prepare('INSERT INTO tasks(id, description, completed) VALUES (?, ?, ?)')
const updateTask = db.prepare('UPDATE tasks SET description = ?, completed = ? WHERE id = ?')
const deleteTask = db.prepare('DELETE FROM tasks WHERE id = ?')

app.get("/task/", (_, response)=>{
    try {
        const tasks = getAllTasks.all()
        const JSONdata = JSON.stringify(tasks)
        response.status(200)
        response.send(JSONdata)
    } catch (error) {
        console.error(error)
        response.status(500)
        response.send(`Error accediendo a la base de datos.
        Consulta la consola del backend para más información`)
    }
})


app.post("/task/", (request, response)=>{
    try {
        const { id, description, completed} = request.body
        const completedValue = completed ? 1 : 0
        insertTask.run(id, description, completedValue)
        response.status(200)
        response.send("Ok")
    } catch (error) {
        console.error(error) 
        response.status(500)
        response.send(`Error accediendo a la base de datos.
        Consulta la consola del backend para más información`)
    }
})


app.delete("/task/", (request, response)=>{
    try {
        deleteTask.run(request.body.id)
        response.status(200)
        response.send("Ok")
    } catch (error) {
        console.error(error) 
        response.status(500)
        response.send(`Error accediendo a la base de datos.
        Consulta la consola del backend para más información`)
    }
})


app.put("/task/", (request, response)=>{
    try {
        const { id, description, completed } = request.body
        const completedValue = completed ? 1 : 0
        updateTask.run( description, completedValue, id )
        response.status(200)
        response.send("Ok")
    } catch (error) {
        console.error(error)
        response.status(500)
        response.send(`Error accediendo a la base de datos.
        Consulta la consola del backend para más información`)
    }
})


app.listen( 8000,()=>{
    console.log("Express working...");
})
