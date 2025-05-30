const TodoData = (props) => {

    //props is a object
    /*
    {
        name: "Darwin",
        age: 21,
        data:{}
    }
    */
    const { name, age, data } = props;
    //const name = props.name;
    //const age = props.age; 
    //const data = props.data;

    return (
        <div className="todo-data">
            <div>My name is {name}, {age}, {JSON.stringify(data)}</div>
            <div>Learning React</div>
            <div>Watching Youtube</div>
        </div>
    )
}

export default TodoData;