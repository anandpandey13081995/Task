import axios from "axios";
import constants from './constants';

const register = async (userData)=>{
    let response = await axios.post(constants.HOSTNAME + '/api/auth/register', userData);

    return response.data;
}

const login = async (userData)=>{
    let response = await axios.post(constants.HOSTNAME + '/api/auth/login', userData);
    return response.data;

}
const logout = async ()=>{
    let response = await axios.get(constants.HOSTNAME + '/api/auth/logout');

    return response.data;
}

export default {
    register,
    login,
    logout
}