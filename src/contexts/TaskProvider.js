import axios from "axios";
import { useEffect, useState } from "react";
import TaskContext from "./TaskContext";


export const TaskProvider = ( props ) => {
    const baseUrl = "http://localhost:3000/api/tasks";
    const [ task, setTask ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await getAllTasks();
        }
        fetchData();
    }, [])

    async function getAllTasks(){
        return axios.get(baseUrl).then(response => setTask(response.data))
    };

    function addTask(task){
        return axios.post(baseUrl, task).then(response => {
            getAllTasks();
            return new Promise(resolve => resolve(response.data))
        });
    }

    function updateTask(task){
        return axios.put(`${baseUrl}/${task.taskId}`, task)
        .then(response => {
            getAllTasks();
            return new Promise((resolve) => resolve(response.data));
        })
    }

    function deleteTask(id){
        return axios.delete(`${baseUrl}/${id}`, task)
        .then(getAllTasks)
    }

    return(
        <TaskContext.Provider value={{
            task,
            getAllTasks,
            addTask,
            updateTask,
            deleteTask
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}