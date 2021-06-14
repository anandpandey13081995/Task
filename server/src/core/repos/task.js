const taskService = require('../services/SDK/mongoose/task');

const create = async (userId, name)=>{
    return await taskService.create(userId, name);
}

const remove = async (id)=>{
    return await taskService.remove(id);
}

const get = async (id)=>{
    return await taskService.get(id);
}

const list = async (userId)=>{
    return await taskService.list(userId);
}

const set = async (taskId, name, isCompleted)=>{
    return await taskService.set(taskId, name, isCompleted);
}

module.exports = {
    create,
    remove,
    get,
    set,
    list
}