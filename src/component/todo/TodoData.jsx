const TodoData = (props) => {

    //props is a object
    /*
    {
        name: "Darwin",
        age: 21,
        data:{}
    }
    */
    const { name, age, data, todoList } = props;
    //const name = props.name;
    //const age = props.age; 
    //const data = props.data;
    console.log("TodoData render", props);
    return (
        <div className="todo-data">
            <div>My name is {name}, {age}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
            <div>{JSON.stringify(todoList)}</div>
        </div>
    )
}

export default TodoData;