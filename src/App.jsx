
import "./component/todo/todo.css";
import TodoData from "./component/todo/TodoData";
import TodoNew from "./component/todo/TodoNew";
import reactLogo from "./assets/react.svg";
import { useState } from "react";
const App = () => {

  const addNewTodo = (name) => {
    const newTodo = {
      id: randomIntFromInterval(1, 1000), // random id from 4 to 1000
      name: name
    }

    setTodoList([...todoList, newTodo]);
  }

  const randomIntFromInterval = (min, max) => { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


  // const name = "Darwin";
  // const age = 21;
  // const data = {
  //   name: "Darwin",
  //   age: 21,
  //   address: "Binhthuan, Vietnam"
  // }

  const [todoList, setTodoList] = useState([
    // { id: 1, name: "Learn React" },
    // { id: 2, name: "Learn NodeJS" },
    // { id: 3, name: "Learn TS" },
  ])

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew
        addNewTodo={addNewTodo}
      />
      <TodoData
        // name={name}
        // age={age}
        // data={data}
        todoList={todoList}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>

  )
}

export default App
