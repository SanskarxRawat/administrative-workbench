const mongoose = require('mongoose'), 
{ Schema } = mongoose;

const conferencePaperSchema = new Schema({
    employeeId : {
        type : Number, 
        required : true
    }, 
    authors : [
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
    doi : {
        type : String, 
        required : true
    }, 
    title : {
        type : String, 
        required : true
    }, 
    conferenceName : {
        type : String, 
        required : true
    }, 
    organizer : {
        type : String, 
        required : true
    }, 
    conferenceType : {
        type : String, 
        required : true
    }, 
    paperStatus : {
        type : String, 
        required : true
    }, 
    monthAndYear : {
        type : String, 
        required : true
    }, 
    volumeNo : {
        type : Number, 
        required : true
    }, 
    issueNo : {
        type : Number, 
        required : true
    }, 
    isbnNo : {
        type : Number
    },
    isMMDUAffilation : {
        type : String, 
        required : true
    }, 
    scopusIndexed : {
        type : String, 
        required : true
    }, 
    belongsToMMDUStudentsWork : {
        type : String, 
        required : true
    }, 
    areYouFirstAuthor : {
        type : String, 
        required : true
    }, 
    webOfScienceDatabase : {
        type : String, 
        required : true
    }, 
    correspondingAuthor : {
        type : String, 
        required : true
    }, 
    guideOfAnyCoAuthor : {
        type : String, 
        required : true
    }, 
    googleScholarIndexed : {
        type : String, 
        required : true
    }, 
    isArticleInPubMedList : {
        type : String, 
        required : true
    }, 
    indexCoperificus : {
        type : String, 
        required : true
    }, 
    isArticleInUGCJournalList : {
        type : String, 
        required : true
    },
    articleFrontPage : {
        type : String
    }, 
    articleWebLink : {
        type : String, 
        required : true
    }
});

module.exports = mongoose.model('Conference Papers', conferencePaperSchema);
