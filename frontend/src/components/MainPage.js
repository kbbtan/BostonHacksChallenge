import React, { useEffect, useState } from "react";

import { getTodos, deleteTodo } from "../api";

import TodoCard from "./TodoCard";
import EventOverlay from "./EventOverlay";

function MainPage() {
    const [todos, setTodos] = useState([]);
    const [display, setDisplay] = useState(false);

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await getTodos();
        setTodos(response.data);
    }

    const deleteTodos = async (id) => {
        await deleteTodo(id);
        fetchTodos();
    }

    const activateOverlay = () => {
        setDisplay(true);
    }

    const collapseOverlay = (e) => {
        setDisplay(false);
    }

  return (
    <div className="bg-neutral-800 w-screen h-screen">
        <EventOverlay display={display} fetchTodos={fetchTodos} collapseOverlay={collapseOverlay}/>
        <div className="p-5">
            <div className="mb-5">
                <div className="flex items-center mb-5">
                    <h1 className="mr-5 font-serif font-semibold italic text-white text-4xl">Todo App</h1>
                    <img className="rounded-lg" height="100px" width="100px" src="https://thumbs.gfycat.com/AdmirableCelebratedAndalusianhorse-size_restricted.gif"/>
                </div>

                <div className="text-white w-32 p-2 px-5 rounded-md text-center cursor-pointer border-2 
                border-orange-400 hover:bg-orange-600 hover:border-orange-600 transition ease-in-out delay-75 hover:scale-105 duration-150"
                onClick={() => activateOverlay()}>
                    <p className="text-lg">Create</p>
                </div>
            </div>
        
            {todos.map((todo) => {
                return <TodoCard key={todo.id} id={todo.id} name={todo.name} 
                deleteTodos={deleteTodos}/>;
            })}
        </div>
    </div>
  );
}

export default MainPage;