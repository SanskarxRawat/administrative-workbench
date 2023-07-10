const User = require("../models/User");
const passport = require('passport');
const uf = require('../utils/utilityFunctions');
const mwf = require('../middleware/middleware');
const ProfilePics = require('../models/profilePic');
const fs = require('fs');
const Schema = require('mongoose').Schema;

exports.verifyEmployeeID = async (req, res) => {

    var token = await Math.floor(100000 + Math.random() * 900000);
    
    const user = await User.findOneAndUpdate({
        employeeId : req.body.employeeId
    }, {
        $set : {
            otp : token
        }
    });

    if(!user) {
        return res.status(400).send({
            message : "This EmployeeId doesn't exist in our database."
        });
    }

    const mailOptions = {
        from : "xyzxyz200107@gmail.com", 
        to : user.email,
        subject : 'Password Reset', 
        text : `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n  
            This is your otp for password change request :\n ${token}\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };

    await uf.sendForgotPasswordMail(mailOptions);

    return res.status(200).send({
        message : "OTP sent successfully."
    });
}

exports.verifyOTP = async (req, res) => {

    const user = await uf.findUserByEmployeeId(req.body.employeeId);

    if(user.otp !== req.body.otp){
        return res.status(400).json({
            message : 'Invalid OTP'
        });
    }

    return res.status(200).send({
        message : "OTP verified Successfully."
    });
};

exports.resetPassword = async (req, res) => {
    
    const response = await User.findOneAndUpdate(
        {employeeId : req.body.employeeId},
        {
            $set : {
                otp : 0
            }
        }
    ).then( async (user) => {
        await user.setPassword(req.body.password, () => {
            user.save();
        });
        return {
            status : 200, 
            message : "Password reset successfully."
        };
    }).catch(err => {
        if(err){
            return {
                status : 401, 
                message : "Password reset unsuccessful. Please try again."
            }
        }
    });

    return res.status(response.status).send({
        message : response.message
    });
};