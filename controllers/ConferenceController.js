const User = require("../models/User");
const ConferencePapers = require("../models/Conference");
const uf = require('../utils/utilityFunctions');


exports.addConference = async (request, response) => {

    var sample = {
        employeeId : request.user.employeeId,
        authors : [],
        doi : request.body.doi,
        title : request.body.title,
        conferenceName : request.body.conferenceName,
        organizer : request.body.organizer,
        conferenceType : request.body.conferenceType,
        paperStatus : request.body.paperStatus,
        monthAndYear : request.body.monthAndYear,
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
        articleWebLink : request.body.articleWebLink,
        volumeNo : request.body.volumeNo, 
        issueNo : request.body.issueNo,
        isbnNo : request.body?.isbnNo
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
    
    let newConferencePaper = new ConferencePapers(sample);

    await newConferencePaper.save().then(async (paper) => {
        JSON.parse(request.body.authors).forEach(async (user) => {
            await User.updateOne(
                {_id : user._id}, 
                {
                    $push : {
                        conferencePapers : paper._id
                    }
                }
            );
        });
    });

    return response.status(200).json({
        message : "Saved successfully"
    });
};

exports.approveConferencePaper = async (req, res) => {
    await ConferencePapers.updateOne({
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

exports.getConferencePapers = async (req, res) => {
    const papers = await uf.getConferencePapers(req.user._id);
    return res.status(200).json({
        papers : papers
    });
};

exports.updateConferencePaper = async (request, response) => {
    await ConferencePapers.findOne({
        _id : (request.body._id)
    }).then( async (item) => {
        // await console.log(item['authors']);
        item['authors'].forEach(async (author) => {
            await User.updateOne({_id : author._id}, 
            {
                $pull : {conferencePapers : item._id}    
            });
        })
    });

    var sample = {
        employeeId : request.user.employeeId,
        authors : [],
        doi : request.body.doi,
        title : request.body.title,
        conferenceName : request.body.conferenceName,
        organizer : request.body.organizer,
        conferenceType : request.body.conferenceType,
        paperStatus : request.body.paperStatus,
        monthAndYear : request.body.monthAndYear,
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
        articleWebLink : request.body.articleWebLink,
        volumeNo : request.body.volumeNo, 
        issueNo : request.body.issueNo,
        isbnNo : request.body?.isbnNo
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

    await ConferencePapers.updateOne({
        _id : request.body._id
    }, {
        $set : sample
    }).then(async() => {
        JSON.parse(request.body.authors).forEach(async (user) => {
            await User.updateOne(
                {_id : user._id}, 
                {
                    $push : {
                        conferencePapers : request.body._id
                    }
                }
            );
        });
    });

    return response.status(200).json({
        message : "Updated successfully"
    });
};