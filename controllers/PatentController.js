const User = require("../models/User");
const PatentPapers = require("../models/Patent");
const uf = require('../utils/utilityFunctions');


exports.addPatent = async (req, res) => {
    // console.log(req.body);

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
    
    let newPatentPaper = new PatentPapers(sample);

    await newPatentPaper.save().then(async (paper) => {

        JSON.parse(req.body.nameOfInventors).forEach(async (user) => {
            await User.updateOne(
                {_id : user._id}, 
                {
                    $push : {
                        patentPapers : paper._id
                    }
                }
            );
        });
    });

    return res.status(200).json({
        message : "saved successfully"
    });
};


exports.getPatentPapers = async (req, res) => {
    const papers = await uf.getPatentPapers(req.user._id);
    return res.status(200).json({
        papers : papers
    });
};


exports.updatePatentPaper = async(req, res) => {
    await PatentPapers.findOne({
        _id : (req.body._id)
    }).then( async (item) => {
        item['nameOfInventors'].forEach(async (author) => {
            await User.updateOne({_id : author._id}, 
            {
                $pull : { patentPapers : item._id}    
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

    await PatentPapers.updateOne({
        _id : req.body._id
    }, {
        $set : sample
    }).then(async () => {

        JSON.parse(req.body.nameOfInventors).forEach(async (user) => {
            await User.updateOne(
                {_id : user._id}, 
                {
                    $push : {
                        patentPapers : req.body._id
                    }
                }
            );
        });
    });

    return res.status(200).json({
        message : "Updated successfully"
    });
};  