const User = require('./models/User');
const mongoose = require('mongoose');

const login = async ({username, password})=>{
    return new Promise((resolve, reject)=>{
        User.findOne({ username }, '_id name username password', function(err, user) {
            if (err){
                reject();
                throw err;
            }
        
            user.comparePassword(password, function(err, isMatch) {
                if (err){
                    reject();
                    throw err;
                }

                resolve({status:isMatch, user});
            });
        })
    });
}

const register = async (user)=>{
    return new Promise((resolve, reject)=>{
        const newUser = new User(user);
        
        newUser.save(function (err) {
            if (err){
                reject({status:false,message:'Username taken!'});
            };

            resolve({status:true});
            // saved!
        })
        
    });
}

module.exports = {
    login,
    register
}