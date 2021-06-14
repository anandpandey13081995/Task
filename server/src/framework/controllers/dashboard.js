const dashboardRepo = require('../../core/repos/dashboard');

const get = async (userId)=>{
    return await dashboardRepo.get(userId);
}

module.exports = {
    get,
}