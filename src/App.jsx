
import "./component/todo/todo.css";
import TodoData from "./component/todo/TodoData";
import TodoNew from "./component/todo/TodoNew";
import reactLogo from "./assets/react.svg";
const App = () => {

  const name = "Darwin";
  const age = 21;
  const data = {
    name: "Darwin",
    age: 21,
    address: "Binhthuan, Vietnam"
  }

  return (
    <div className="todo-container">
      <div className="todo-title">Todo List</div>
      <TodoNew />
      <TodoData
        name={name}
        age={age}
        data={data}
      />
      <div className="todo-image">
        <img src={reactLogo} className="logo" />
      </div>
    </div>

  )
}

export default App
