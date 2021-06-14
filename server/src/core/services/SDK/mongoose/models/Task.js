const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    userId:{
        type: String,
        required:true
    },
    name:{
        type: String,
        required:true,
    },
    completed:{
        type:Boolean,
        required:true,
        default:false
    },
});

module.exports =  mongoose.model('Task', TaskSchema);