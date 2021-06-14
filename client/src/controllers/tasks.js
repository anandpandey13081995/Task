import axios from "axios";
import constants from './constants';

axios.defaults.withCredentials = true;

const getDashboard = async ()=>{
    let response = await axios.get(constants.HOSTNAME + '/api/dashboard');

    return response.data;
}

const createTask = async (taskData)=>{
    let response = await axios.post(constants.HOSTNAME + '/api/tasks', taskData);

    return response.data;
}

const removeTask = async (taskId)=>{
    let response = await axios.delete(constants.HOSTNAME + '/api/tasks/'+taskId);
    
    return response.data;
}

const editTask = async (taskId, name, isCompleted)=>{
    console.log(taskId,name,isCompleted)
    let response = await axios.put(constants.HOSTNAME + '/api/tasks/'+taskId, {name:name, isCompleted:isCompleted});

    return response.data;
}

export default {
    getDashboard,
    createTask,
    removeTask,
    editTask
}