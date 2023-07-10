var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfilePicSchema = new Schema({
    img : {
        data : Buffer, 
        contentType : String
    }
}, {
    timestamps : true
});

module.exports = mongoose.model('ProfilePics', ProfilePicSchema);