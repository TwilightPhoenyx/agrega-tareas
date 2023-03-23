import sqlite3 from 'sqlite3';
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('./base-de-datos.db', (error) => {
    if (error) console.error(error)
    else console.log('Conectada con la base de datos.');
});

db.run(`
    CREATE TABLE
        IF NOT EXISTS
        tareas(
            id INTEGER PRIMARY KEY,
            descripcion TEXT NOT NULL,
            completada BOOLEAN NOT NULL
        )
`);

app.get("/tarefa/", (_, respuesta)=>{
    db.all( 
            `SELECT id, descripcion, completada FROM tareas`,
            (error, datos) => {
                if (error) {
                    console.error(error)
                    respuesta.status(500)
                    respuesta.send(`Error accediendo a la base de datos.
                    Consulta la consola del backend para más información`)
                }
                else {
                    const JSONdatos = JSON.stringify(datos)
                    respuesta.status(200)
                    respuesta.send(JSONdatos)
                }
            }
        )
})

app.post("/tarefa/", (peticion, respuesta)=>{
    db.run(
        `INSERT INTO tareas(id, descripcion, completada) VALUES (?, ?, ?)`,
        [peticion.body.id, peticion.body.descripcion, peticion.body.completada],
        (error) => {
            if (error) {
                console.error(error) 
                respuesta.status(500)
                respuesta.send(`Error accediendo a la base de datos.
                Consulta la consola del backend para más información`)
            } else {
                respuesta.status(200)
                respuesta.send("Ok")
            }
        }
    )
})

app.delete("/tarefa/", (peticion, respuesta)=>{
    db.run(
        `DELETE FROM tareas WHERE id = ?`,
        [peticion.body.id],
        (error) => {
            if (error) {
                console.error(error) 
                respuesta.status(500)
                respuesta.send(`Error accediendo a la base de datos.
                Consulta la consola del backend para más información`)
            } else {
                respuesta.status(200)
                respuesta.send("Ok")
            }
        }
    )
})

app.put("/tarefa/", (peticion, respuesta)=>{
    db.run(
        `UPDATE tareas SET descripcion = ?, completada = ? WHERE id = ?`,
        [peticion.body.descripcion, peticion.body.completada, peticion.body.id],
        (error) => {
            if (error) {
                console.error(error) 
                respuesta.status(500)
                respuesta.send(`Error accediendo a la base de datos.
                Consulta la consola del backend para más información`)
            } else {
                respuesta.status(200)
                respuesta.send("Ok")
            }
        }
    )
})


app.listen( 8000,()=>{
    console.log("Express traballando...");
})
