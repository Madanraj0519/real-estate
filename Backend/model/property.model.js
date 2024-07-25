const mongoose = require('mongoose');

const propertyModel = new mongoose.Schema({
    propertyImg : {
        type : String,
    },
    propertyType : {
        type : String,
    },
    location : {
        type : String,
    },
    price : {
        type : String,
    },
    description : {
        type : String,
    },
    status : {
        type : String,
        default : 'Not Sold',
    },
    createdBy : {
        userId : {
            type : mongoose.Schema.Types.ObjectId,
        },
        email : {
            type : String,
        }
    }
});

module.exports = mongoose.model('Property', propertyModel);