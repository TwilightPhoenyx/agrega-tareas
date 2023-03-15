# Trasteando con React & Express

## Ejemplo petición POST
```js
const resposta = await fetch(
    "http://localhost:8000/tarefa/",
    {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
            {
                id: 666,
                descripcion: "Unha nova tarefa",
                rematada: false,
            }
        ),
    }
)
```

## Ejemplo petición GET
```js
const resposta = await fetch(
    "http://localhost:8000/tarefa/"
)
const datos = await resposta.json()
```