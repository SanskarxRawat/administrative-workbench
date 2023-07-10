const User = require("../models/User");
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const JournalPapers = require('../models/Journal');
const ConferencePapers = require('../models/Conference');
const PatentPapers = require('../models/Patent');
const CopyrightPapers = require('../models/Copyright');
const cron = require('node-cron');
const fs = require('fs');






exports.findUserByEmployeeId = async (employeeId) => {
        return await User.findOne({
            employeeId : employeeId
        }).then((items) => {
            return items;
        }).catch((error) => {
            console.log(error);
        });
};



exports.findUserBy_id = async (_id) => {
    return await User.findOne({
        _id : _id
    }).then((items) => {
        return items;
    }).catch((error) => {
        console.log(error);
    });
};

exports.getUsersList = async() => {
    return await User.find({role : {$in : ["Faculty", "HOD"]}, approved : true}).then((users) => {
        return users;
    }).catch((error) => {
        console.log(error);
    })
}



// exports.findResearchPapers = async (employeeId) => {
//     const result =  await ResearchPapers.find({
//         employeeId : employeeId
//     });
//     return result;
// };

exports.getJournalPapers = async(_id) => {
    const user = await User.findOne({
        _id : _id
    });
    let jp = await JournalPapers.find({
        _id : {
            $in : user.journalPapers
        }
    });

    return jp.map((item, index) => ({
        ...item._doc, id : index + 1
    }));
}

exports.getConferencePapers = async(_id) => {
    const user = await User.findOne({
        _id : _id
    });
    let cp = await ConferencePapers.find({
        _id : {
            $in : user.conferencePapers
        }
    });

    return cp.map((item, index) => ({
        ...item._doc, id : index + 1
    }));
}

exports.getPatentPapers = async(_id) => {
    const user = await User.findOne({
        _id : _id
    });
    let pp = await PatentPapers.find({
        _id : {
            $in : user.patentPapers
        }
    });

    return pp.map((item, index) => ({
        ...item._doc, id : index + 1
    }));
}

exports.getCopyrightPapers = async(_id) => {
    const user = await User.findOne({
        _id : _id
    });
    let copyright = await CopyrightPapers.find({
        _id : {
            $in : user.copyrightPapers
        }
    });

    return copyright.map((item, index) => ({
        ...item._doc, id : index + 1
    }));
}

exports.generateToken = () => {
    return crypto.randomBytes(20).toString('hex');
};

exports.sendForgotPasswordMail = async function(mailOptions) {
    return new Promise((resolve, reject) => {
        let transporter = nodemailer.createTransport({
            // service : 'gmail', // true for 465, false for other ports
            host: "smtp.gmail.com",
            port: 587,
            secure: false, // true for 587, false for other ports
            requireTLS: true,
            auth: {
            user: "xyzxyz200107@gmail.com", // generated ethereal user
            pass: "administrativeworkbench", // generated ethereal password
            },
        });
    
    
        const info = transporter.sendMail(
            mailOptions
            // function(err, res) {
            //         if(err){
            //             // console.log("err : ",err);
            //             return ({
            //                 message : err
            //             });
            //         } else {
            //             // console.log("res : ", res);
            //             return ({
            //                 message : res
            //             });
            //         }
            //     }
        );
    
        console.log("info : ",info);
        
        resolve(info);
    }) ;
};

exports.pendingAccountApprovals = async (employeeId) => {
    return await User.find({
        approved : false
    }).then((items) => {
        return items;
    }).catch((error) => {
        console.log(error);
    });

};

exports.tasks = cron.schedule('* * * * *', () => {
    if(fs.existsSync('outputFiles/My Document.docx')){
        fs.unlinkSync('outputFiles/My Document.docx');
    }
    console.log('file deleted');
}, 
{
    scheduled: false
});


exports.createDocx = (papers) => {

}