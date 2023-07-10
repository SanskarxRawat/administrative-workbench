const User = require('../models/User');

exports.getUnapprovedAccounts = async (req, res) => {

    let result = await User.find({
        approved : false
    }).then( (val) => {
        return val.map((item, index) => ({
            id : index + 1, 
            name : item._doc.name, 
            employeeId : item._doc.employeeId, 
            role : item._doc.role, 
            email : item._doc.email, 
            _id : item._doc._id
        }));
    });

    return res.status(200).json(result);
};

exports.approveAccount = async(req, res) => {
    await User.findOne({
        _id : req.body._id
    }, {
        $set : {
            "approved" : true
        }
    });

    return res.status(200).json({
        message : "Account Approved Successfully"
    });
};

exports.rejectAccount = async(req, res) => {
    await User.deleteOne({
        _id : req.body._id
    }, {
        $set : {
            "approved" : true
        }
    });

    return res.status(200).json({
        message : "Account Deleted Successfully"
    });
};