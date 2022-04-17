import { useState } from "react";

import { createTodo } from "../api";

import { FaTimes } from "react-icons/fa";

export default function EventOverlay({ display, fetchTodos, collapseOverlay }) {
    const [name, setName] = useState("");

    const handleChange = (e) => {
        setName(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        await createTodo(name);
        setName("");

        collapseOverlay();
        fetchTodos();
    }

    if (display) {
        return (
            <div className="w-full h-full fixed flex justify-center items-center bg-white/10 cursor-default z-10"
            >
                <div className="w-1/2 h-1/2 bg-neutral-900 rounded-md p-5 animate-slide-in">
                    <div className="flex justify-between">
                        <h2 className="font-serif font-semibold italic text-white text-3xl mb-5">Create Todo:</h2>  
                        <FaTimes className="text-red-600/50 hover:text-red-600 hover:scale-105 text-3xl cursor-pointer" onClick={() => collapseOverlay()}/>
                    </div>                    
                    <form onSubmit={handleSubmit}>
                        <input className="rounded-sm px-1 mb-5 text-xl" type="text" placeholder="Name" value={name} onChange={handleChange} /><br/>
                        <input className="text-white w-32 p-2 px-5 rounded-md text-center cursor-pointer border-2 border-orange-400
                        hover:bg-orange-600 hover:border-orange-600 transition ease-in-out delay-75 hover:scale-105 duration-150" type="submit" value="Submit" />
                    </form>
                </div>
            </div>
        )
    }

    return <div></div>;
}