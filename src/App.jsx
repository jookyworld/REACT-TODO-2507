import { useState } from 'react'

function App() {
    const [todos, setTodos] = useState(['공부하기', '코딩하기', '운동하기'])

    // Form 처리하는 함수
    const handleOnSubmit = (e) => {
        e.preventDefault() //  기본 동작 방지
        const form = e.target // e.target은 form 요소를 가리킴
        setTodos([form.todo.value, ...todos]) //todos 배열에 새 항목 추가
    }

    const removeTodo = (selectedIndex) => {
        setTodos(todos.filter((todo, index) => index != selectedIndex))
    }

    return (
        <>
            <form onSubmit={handleOnSubmit}>
                <input type="text" name="todo" />
                <button type="submit">등록</button>
            </form>
            <ul>
                {todos.map((todo, i) => (
                    <li key={i}>
                        {todo} <button onClick={() => removeTodo(i)}>x</button>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default App
