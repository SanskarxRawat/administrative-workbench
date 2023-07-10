const mongoose = require('mongoose'), 
{ Schema } = mongoose;

const journalPaperSchema = new Schema({
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
    manuscriptTitle : {
        type : String, 
        required : true
    }, 
    fullJournalName : {
        type : String, 
        required : true
    }, 
    publisher : {
        type : String, 
        required : true
    }, 
    publicationType : {
        type : String, 
        required : true
    }, 
    publicationStatus : {
        type : String, 
        required : true
    }, 
    monthAndYear : {
        type : String, 
        required : true
    }, 
    e_issn : {
        type : String, 
        required : true
    }, 
    p_issn : {
        type : String, 
        required : true
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
    sci_scie_ssci_indexed : {
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
    }, 
    volumeNo : {
        type : Number,
    }, 
    issueNo : {
        type : Number
    }
});

module.exports = mongoose.model('Journal Papers', journalPaperSchema);
