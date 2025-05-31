import { useState } from "react";

const TodoNew = (props) => {
    const { addNewTodo } = props;
    // addNewTodo("Darwin");

    const [valueInput, setValueInput] = useState("Darwin");


    const handleClick = () => {
        addNewTodo(valueInput);
    }

    const handleOnChange = (name) => {
        setValueInput(name);
    }

    return (
        <div className="todo-new">
            <input type="text" onChange={(event) => handleOnChange(event.target.value)} />
            <button style={{ cursor: "pointer" }} onClick={handleClick}>Add</button>
            <div>My name is {valueInput}</div>
        </div>
    )

}

export default TodoNew;