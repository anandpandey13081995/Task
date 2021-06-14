const taskService = require('../services/SDK/mongoose/task');

const get = async (userId)=>{
    const allTasks = await taskService.list(userId);

    let taskCompleted = 0;

    for (let index = 0; index < allTasks.length; index++) {
        const task = allTasks[index];
        if(task.completed)  taskCompleted++;
    }

    return {
        taskCompleted,
        totalTask: allTasks.length,
        latestTasks: allTasks
    }
}

module.exports = {
    get,
}