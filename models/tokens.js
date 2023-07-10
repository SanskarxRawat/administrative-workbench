const mongoose = require('mongoose'), 
{Schema} = mongoose, 
plm = require('passport-local-mongoose');

const tokenSchema = new Schema({
    userId : {
        type: Schema.Types.ObjectId, 
        required : true, 
        ref: 'Users'
    }, 
    token : {
        type : String, 
        required : true
    }, 
    createdAt : {
        type : Date, 
        default : Date.now, 
        expires: 3600
    }
});

module.exports = mongoose.model('token', tokenSchema);