import { useEffect, useState } from 'react'

function App() {
    useEffect(() => {
        fetch('https://dummyjson.com/todos')
            .then((res) => res.json())
            .then((res) => setTodos(res.todos))
    }, [])

    const [todoId, setTodoId] = useState(4)

    const [todos, setTodos] = useState([])

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const form = e.target

        fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                todo: form.todo.value,
                completed: false,
                userId: 5,
            }),
        })
            .then((res) => res.json())
            .then(console.log)

        // setTodos([{ id: todoId, todo: form.todo.value, completed: false }, ...todos])
        // setTodoId(todoId + 1)
    }

    const removeTodo = (seletedId) => {
        const filterTodos = todos.filter((todo) => todo.id != seletedId)
        setTodos(filterTodos)
    }

    const toggleTodo = (seletedId) => {
        const updateTodos = todos.map((todo) => (todo.id == seletedId ? { ...todo, completed: !todo.completed } : todo))
        setTodos(updateTodos)
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name="todo" />
                <button type="submit">등록</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            onChange={() => {
                                toggleTodo(todo.id)
                            }}
                            checked={todo.completed}
                        />
                        {JSON.stringify(todo.completed)} / {todo.id} / {todo.todo}
                        <button onClick={() => removeTodo(todo.id)}>X</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
