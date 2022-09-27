import React, { useState, useEffect } from "react";
import axios from "axios";

interface TodoType {
    completed: boolean;
id: string;
title: string;
userId: string;
}
const Todos = () => {
const [todoList, setTodoList] = useState<TodoType[]>([]);

useEffect(() => {
(async () => {
const todos = await axios.get(
"https://jsonplaceholder.typicode.com/todos"
);

setTodoList(todos.data);
})();
}, []);

return( todoList ? (
<ul>
{todoList.map((todo, index) => (
<li key={index} data-testid="todo">{todo?.title}</li>
))}
</ul>
) : (
<p>Loading....</p>
))}

export default Todos;