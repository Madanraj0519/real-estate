const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    userName : {
        type : 'string',
        required : true,
    },
    email : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    phoneNumber : {
        type : String,
    },
});


module.exports = mongoose.model('User', userModel);