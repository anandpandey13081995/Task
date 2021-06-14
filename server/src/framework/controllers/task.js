const taskRepo = require('../../core/repos/task');

const create = async (userId, name)=>{
    return await taskRepo.create(userId, name);
}

const remove = async (id)=>{
    return await taskRepo.remove(id);
}

const get = async (id)=>{
    return await taskRepo.get(id);
}

const list = async (userId)=>{
    return await taskRepo.list(userId);
}

const set = async (taskId, name, isCompleted)=>{
    return await taskRepo.set(taskId, name, isCompleted);
}

module.exports = {
    create,
    remove,
    get,
    set,
    list
}