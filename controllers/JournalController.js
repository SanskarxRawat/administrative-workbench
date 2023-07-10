const User = require("../models/User");
const JournalPapers = require("../models/Journal");
const uf = require('../utils/utilityFunctions');

exports.addJournal = async (request, response) => {

    var sample = {
        employeeId : request.user.employeeId,
        authors : [],
        doi : request.body.doi,
        manuscriptTitle : request.body.manuscriptTitle,     
        fullJournalName : request.body.fullJournalName,
        publisher : request.body.publisher,
        publicationType : request.body.publicationType,
        publicationStatus : request.body.publicationStatus,
        monthAndYear : request.body.monthAndYear,
        e_issn : request.body.e_issn,
        p_issn : request.body.p_issn,
        isMMDUAffilation : request.body.isMMDUAffilation,
        scopusIndexed : request.body.scopusIndexed,
        belongsToMMDUStudentsWork : request.body.belongsToMMDUStudentsWork,
        areYouFirstAuthor : request.body.areYouFirstAuthor,
        sci_scie_ssci_indexed : request.body.sci_scie_ssci_indexed,
        webOfScienceDatabase : request.body.webOfScienceDatabase,
        correspondingAuthor : request.body.correspondingAuthor,
        guideOfAnyCoAuthor : request.body.guideOfAnyCoAuthor,
        googleScholarIndexed : request.body.googleScholarIndexed,
        isArticleInPubMedList : request.body.isArticleInPubMedList,
        indexCoperificus : request.body.indexCoperificus,
        isArticleInUGCJournalList : request.body.isArticleInUGCJournalList,
        articleFrontPage : " ",
        articleWebLink : request.body.articleWebLink,
        volumeNo : request.body.volumeNo, 
        issueNo : request.body.issueNo, 
    };


    if(request.file){
        sample.articleFrontPage = request.file.path;
    }

    await JSON.parse(request.body.authors).forEach(async (user) => {
        sample['authors'].push({
            name: user.name, 
            _id : user._id
        });
    });

    
    let newJournalPaper = new JournalPapers(sample);

    await newJournalPaper.save().then(async (paper) => {
        JSON.parse(request.body.authors).forEach(async (user) => {
            await User.updateOne(
                {_id : user._id}, 
                {
                    $push : {
                        journalPapers : paper._id
                    }
                }
            );
        });
    });

    return response.status(200).json({
        message : "Saved successfully"
    });
};


exports.approveJournalPaper = async (req, res) => {
    await JournalPapers.updateOne({
        _id : req.body.id
    }, 
        {
            $set : {
                approved : true
            }
        }
    );
    return res.status(200).json({
        message : "Successfully approved"
    });
}


exports.getJournalPapers = async (req, res) => {
    let papers = await uf.getJournalPapers(req.user._id);
    papers.map((item) => {
        console.log(item.authors);
    })
    return res.status(200).json({
        papers : papers
    });
};

exports.updateJournalPaper = async (request, response) => {

    await JournalPapers.findOne({
        _id : (request.body._id)
    }).then( async (item) => {
        
        item['authors'].forEach(async (author) => {
            await User.updateOne({_id : author._id}, 
            {
                $pull : {journalPapers : item._id}    
            });
        })
    });

    var sample = {
        employeeId : request.user.employeeId,
        authors : [],
        doi : request.body.doi,
        manuscriptTitle : request.body.manuscriptTitle,
        fullJournalName : request.body.fullJournalName,
        publisher : request.body.publisher,
        publicationType : request.body.publicationType,
        publicationStatus : request.body.publicationStatus,
        monthAndYear : request.body.monthAndYear,
        e_issn : request.body.e_issn,
        p_issn : request.body.p_issn,
        isMMDUAffilation : request.body.isMMDUAffilation,
        scopusIndexed : request.body.scopusIndexed,
        belongsToMMDUStudentsWork : request.body.belongsToMMDUStudentsWork,
        areYouFirstAuthor : request.body.areYouFirstAuthor,
        sci_scie_ssci_indexed : request.body.sci_scie_ssci_indexed,
        webOfScienceDatabase : request.body.webOfScienceDatabase,
        correspondingAuthor : request.body.correspondingAuthor,
        guideOfAnyCoAuthor : request.body.guideOfAnyCoAuthor,
        googleScholarIndexed : request.body.googleScholarIndexed,
        isArticleInPubMedList : request.body.isArticleInPubMedList,
        indexCoperificus : request.body.indexCoperificus,
        isArticleInUGCJournalList : request.body.isArticleInUGCJournalList,
        articleFrontPage : " ",
        articleWebLink : request.body.articleWebLink,
        volumeNo : request.body.volumeNo, 
        issueNo : request.body.issueNo, 
    };

    if(request.file){
        sample.articleFrontPage = request.file.path;
    }

    await JSON.parse(request.body.authors).forEach(async (user) => {
        sample['authors'].push({
            name : user.name, 
            _id : user._id
        });
    });

    await JournalPapers.updateOne({
        _id : request.body._id
    }, {
        $set : sample
    }).then(async () => {
        JSON.parse(request.body.authors).forEach(async (user) => {
            await User.updateOne(
                {_id : user._id}, 
                {
                    $push : {
                        journalPapers : request.body._id
                    }
                }
            );
        });
    });

    return response.status(200).json({
        message : "Updated successfully"
    });
};