import axios from "axios";

const IP = "127.0.0.1";
const PORT = 5000;
const URL = `http://${IP}:${PORT}/`;

const getTodos = async () => {
    const response = await axios.get(URL + "getTodos");
    return response.data;
}

const createTodo = async (name) => {
    const response = await axios.post(URL + "create", {"name": name});
    return response.data;
}

const deleteTodo = async (id) => {
    const response = await axios.post(URL + "deleteTodo", {"id": id});
    return response.data;
}

export { getTodos, createTodo, deleteTodo };