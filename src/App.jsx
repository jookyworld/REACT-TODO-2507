import { useEffect, useState } from 'react'
function App() {
    const [todoId, setTodoId] = useState(4)
    const [todos, setTodos] = useState([
        { id: 1, text: '공부하기', checked: false },
        { id: 2, text: '밥먹고 커피먹기', checked: false },
        { id: 3, text: '헬스장 갔다 샤워하기', checked: false },
    ])

    //입력 폼 처리
    const handleOnSubmit = (e) => {
        e.preventDefault()
        const form = { id: todoId, text: e.target.elements.todo.value, checked: false }
        setTodoId(todoId + 1)
        setTodos([form, ...todos])
    }

    //삭제
    const removeTodo = (id) => {
        setTodos(todos.filter((todo) => id !== todo.id))
    }

    const toggleTodo = (id) => {
        setTodos(todos.map((todo) => (id === todo.id ? { ...todo, checked: !todo.checked } : todo)))
    }

    // 우선순위 위로
    const moveUp = (index) => {
        if (index === 0) return
        const newTodos = [...todos]
        ;[newTodos[index - 1], newTodos[index]] = [newTodos[index], newTodos[index - 1]]
        setTodos(newTodos)
    }

    // 우선순위 아래로
    const moveDown = (index) => {
        if (index === todos.length - 1) return
        const newTodos = [...todos]
        ;[newTodos[index + 1], newTodos[index]] = [newTodos[index], newTodos[index + 1]]
        setTodos(newTodos)
    }

    return (
        <>
            <h1>ToDo List</h1>

            <ul>
                {[...todos]
                    .sort((a, b) => a.checked - b.checked)
                    .map((todo, i) => (
                        <li key={todo.id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <input type="checkbox" checked={todo.checked} onChange={() => toggleTodo(todo.id)} />
                            {todo.text}
                            <button onClick={() => removeTodo(todo.id)}>X</button>
                            <button onClick={() => moveUp(i)}>↑</button>
                            <button onClick={() => moveDown(i)}>↓</button>
                        </li>
                    ))}
            </ul>
            <h3>
                전체 일 : {todos.length} <br></br>
                완료한 일 : {todos.filter((todo) => todo.checked).length} <br></br>
                <span style={{ color: 'red' }}>처리할 일 : {todos.filter((todo) => !todo.checked).length}</span>
            </h3>

            <form onSubmit={handleOnSubmit}>
                <input type="text" name="todo" />
                <button type="submit">등록</button>
            </form>
        </>
    )
}

export default App
