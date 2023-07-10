const mongoose = require('mongoose'), 
{ Schema } = mongoose;


const copyrightPaperSchema = new Schema({
    nameOfInventors : [
        {
            name : {
                type : String
            },
            _id : {
                 type : Schema.Types.ObjectId,
                 ref : 'Users'
            }
        }
    ], 
    title : {
        type : String, 
        required : true
    }, 
    applicationNo : {
        type : Number, 
        required : true
    }, 
    monthAndYear : {
        type : String, 
        required : true
    }, 
    status : {
        type : String, 
        required : true
    }, 
    nameOfAgency : {
        type : String, 
        required : true
    }, 
    proof : {
        type : String, 
        required : true
    }
});

module.exports = mongoose.model('Copyright Papers', copyrightPaperSchema);