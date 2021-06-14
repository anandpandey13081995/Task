const authenticationRepo = require('../../core/repos/authentication');

const register = async (userData)=>{
    return await authenticationRepo.register(userData);
}

const login = async (userData)=>{
    return await authenticationRepo.login(userData);
}

module.exports={
    register,
    login
}