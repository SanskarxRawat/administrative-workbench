const User = require("../models/User");
const CopyrightPapers = require("../models/Copyright");
const uf = require('../utils/utilityFunctions');

exports.addCopyright = async (req, res) => {

    var sample = {
        nameOfInventors : [],
        title : req.body.title, 
        applicationNo : req.body.applicationNo, 
        monthAndYear : req.body.monthAndYear, 
        status : req.body.status, 
        nameOfAgency : req.body.nameOfAgency,
        proof : req.body.proof, 
    };

    if(req.file){
        sample.proof = req.file.path;
    }

    await JSON.parse(req.body.nameOfInventors).forEach(async (user) => {
        sample['nameOfInventors'].push({
            name : user.name, 
            _id : user._id
        });
    });
    
    let newCopyrightPaper = new CopyrightPapers(sample);

    await newCopyrightPaper.save().then(async (paper) => {
        JSON.parse(req.body.nameOfInventors).forEach(async (user) => {
            await User.updateOne(
                {_id : user._id}, 
                {
                    $push : {
                        copyrightPapers : paper._id
                    }
                }
            );
        });
    });

    return res.status(200).json({
        message : "saved successfully"
    });
};

exports.getCopyrightPapers = async (req, res) => {
    const papers = await uf.getCopyrightPapers(req.user._id);
    return res.status(200).json({
        papers : papers
    });
};

exports.updateCopyrightPaper = async(req, res) => {
    await CopyrightPapers.findOne({
        _id : (req.body._id)
    }).then( async (item) => {
        item['nameOfInventors'].forEach(async (author) => {
            await User.updateOne({_id : author._id}, 
            {
                $pull : { copyrightPapers : item._id}    
            });
        })
    });

    var sample = {
        nameOfInventors : [] , 
        title : req.body.title, 
        applicationNo : req.body.applicationNo, 
        monthAndYear : req.body.monthAndYear, 
        status : req.body.status, 
        nameOfAgency : req.body.nameOfAgency,
        proof : req.body.proof,
    };

    if(req.file){
        sample.proof = req.file.path;
    }

    await JSON.parse(req.body.nameOfInventors).forEach(async (user) => {
        sample['nameOfInventors'].push({
            name : user.name,
            _id : user._id
        });
    });

    await CopyrightPapers.updateOne({
        _id : req.body._id
    }, {
        $set : sample
    }).then(async () => {

        JSON.parse(req.body.nameOfInventors).forEach(async (user) => {
            await User.updateOne(
                {_id : user._id}, 
                {
                    $push : {
                        copyrightPapers : req.body._id
                    }
                }
            );
        });
    });

    return res.status(200).json({
        message : "Updated successfully"
    });
};