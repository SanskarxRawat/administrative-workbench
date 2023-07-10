const uf = require('../utils/utilityFunctions');
const User = require('../models/User')


exports.home = (request, response) => {
    // console.log(request.session);
    return response.status(200).json({
        message : "user verified."
    });
};


exports.getAllPapers = async (req, res) => {
    let journalPapers = await uf.getJournalPapers(req.user._id);
    
    let conferencePapers = await uf.getConferencePapers(req.user._id);

    let patentPapers = await uf.getPatentPapers(req.user._id); 
    
    let copyrightPapers = await uf.getCopyrightPapers(req.user._id); 

    return res.status(200).json({
        journalPapers : journalPapers, 
        conferencePapers : conferencePapers,
        patentPapers : patentPapers,
        copyrightPapers : copyrightPapers
    });
};

exports.approveAccount = async(req, res) => {
    await User.updateOne(
        {_id : req.body._id}, 
        {
            $set : {
                "approved" : true
            },
            $currentDate : {
                lastModified : true
            }
        }
    );

    return res.status(200).json({
        message : "Updated SuccessFully."
    });
};


exports.getJournalPapers = async(req, res) => {
    const result = await uf.getJournalPapers(req.user._id);

    return res.status(200).send({
        data : result
    });
}

exports.getConferencePapers = async(req, res) => {
    const result = await uf.getConferencePapers(req.user._id);

    return res.status(200).send({
        data : result
    });
}

exports.getPatentPapers = async(req, res) => {
    const result = await uf.getPatentPapers(req.user._id);

    return res.status(200).send({
        data : result
    });
}

exports.getCopyrightPapers = async(req, res) => {
    const result = await uf.getCopyrightPapers(req.user._id);

    return res.status(200).send({
        data : result
    });
}

exports.getUnapprovedAccounts = async (req, res) => {

    let result = await User.find({
        approved : false
    });

    return result.map((item, index) => ({
        ...item.doc, id : index+1
    }));
};  