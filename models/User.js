const mongoose = require('mongoose'), 
{ Schema } = mongoose, 
passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    role : {
        type : String, 
        required : true, 
    }, 
    profilePic : {
        type : Schema.Types.ObjectId, 
        ref : 'profilepics'
    },
    dp : {
        data : Buffer, 
        contentType : String
    },
    name : {
        type : String, 
        required : true, 
        trim : true
    }, 
    employeeId : {
        type : Number, 
        required : true,
        unique : true, 
        toInt : true
    }, 
    email : {
        type : String,
        unique : true,
        required : true
    },
    otp : {
        type : String
    },
    approved : {
        type : Boolean,
        required : true
    }, 
    journalPapers : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Journal Paper'
        }
    ],
    conferencePapers : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Conference Paper'
        }
    ],  
    patentPapers : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Patent Paper'
        }
    ],
    copyrightPapers : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Copyright Papers'
        }
    ],  
}, {
    timestamps : true
});

userSchema.plugin(passportLocalMongoose, {
    usernameField : 'employeeId',
});

module.exports = mongoose.model('Users', userSchema);