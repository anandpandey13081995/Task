const authenticationService = require('../services/SDK/mongoose/authentication');

const login = async (userData)=>{
    return await authenticationService.login(userData);
}

const register = async (userData)=>{
    return await authenticationService.register(userData);
}

module.exports = {
    login,
    register
}