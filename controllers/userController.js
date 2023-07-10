const User = require("../models/User");
const passport = require('passport');
const utilityFunction = require('../utils/utilityFunctions');
const mwf = require('../middleware/middleware');
const ProfilePics = require('../models/profilePic');
const fs = require('fs');
const Schema = require('mongoose').Schema;



exports.login = (request, response) => {
    passport.authenticate('local', (err, user, info) => {
            if(err) {
                return response.status(401).json({
                    message : err
                });
            }
            if(!user) {
                return response.status(401).json({
                    message : "Invalid credentials or user does not exist."
                });
            } else if(user && !user.approved ) {
                return response.status(401).json({
                    message : "Account not approved"
                });
            } else if(user && user.role !== request.body.role){
                return response.status(401).json({
                    message : "Invalid credentials or user does not exist."
                });
            }
            else {
                request.login(user, (error) => {
                        if(error) {
                            response.status(400).json({
                                error : error
                            });
                        }
                        return response.status(200).json({
                            message : 'Authentication successful.', 
                            name : user.name, 
                            employeeId : user.employeeId, 
                            email : user.email,
                            id : user._id,
                            url : 'homePage', 
                            profilePic : (user.dp ? user.dp : null), 
                            role : user.role
                        });
                    });
            }
            })(request, response);
};  

exports.signup = async (request, response) => {
    
    var userData = {
        name : request.body.name, 
        employeeId : request.body.employeeId, 
        email : request.body.email, 
        role : request.body.role, 
        password : request.body.password,
        
    };
    
    let newUser = new User(userData);

    if(request.file){
        newUser.dp.data = fs.readFileSync(request.file.path);
        newUser.dp.contentType = 'image/jpeg';
    }

    newUser['approved'] = false;

    User.register(newUser, request.body.password, (error, user) => {
        if(user) {
            response.status(200).json({
                "message" : "Details saved successfully. Account has to be approved by admin."
            });
        } else {
            console.log(error.message);
            response.status(400).json({
                "message" : error.message
            });
        }
    });
};  

exports.forgotPassword = async function(request, response) {
    
    var input = request.body;

    var token = await Math.floor(100000 + Math.random() * 900000);

    console.log(token);

    const getMyUser = async function() {

        var myUser ;
        myUser = await utilityFunction.findUserByEmployeeId(input.employeeId).then(items => {
            return items;
        });

        if(!myUser){
            return response.status(400).send({
                message : "Invalid Employee ID."
            });
        }

        await User.findOneAndUpdate(
            {employeeId : input.employeeId}, 
            {
                $set : {
                    otp : token
                }
            }
        );

        myUser = await utilityFunction.findUserByEmployeeId(input.employeeId).then(items => {
            return items;
        });

        return myUser;
    };

    const myUser1 = await getMyUser();

    const mailOptions = {
        from : "xyzxyz200107@gmail.com", 
        to : myUser1.email,
        subject : 'Password Reset', 
        text : `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n  
            This is your otp for password change request :\n ${token}\n
            If you did not request this, please ignore this email and your password will remain unchanged.\n`
    };
    

    const result = await utilityFunction.sendForgotPasswordMail(mailOptions);

    return response.status(200).json(result);
};  

exports.resetPassword = async (request, response) => {
    if(request.body.otp &&  request.body.employeeId){
        const user1 = await utilityFunction.findUserByEmployeeId(request.body.employeeId);
        if(user1.otp !== request.body.otp){
            return response.status(400).json({
                message : 'Invalid OTP'
            });
        }

        await User.findOneAndUpdate(
            {employeeId : request.body.employeeId}, 
            {
                $set : {
                    otp : 0
                }
            }
        );

        if(!request.body.password){
            return response.status(400).json({
                message : 'password cannot be empty.'
            });
        }

        await User.findOne({
            employeeId : request.body.employeeId
        }).then( async (user) => {
            await user.setPassword(request.body.password, () => {
                user.save();
            });
        });

        await request.logout();

        return response.status(200).json({
            message : "password reset successful."
        });

    }
    return response.status(400).json({
        message : "Invalid request"
    });
};  

exports.verifyOTP = (req, res) => {
    
}

exports.logout = (request, response) => {
    request.logout();
    request.session.destroy();
    return response.status(200).json({
        message : "logged out successfully.", 
    });
}

exports.pendingAccountApprovals = async (request, response) => {
    var myUser ;
    myUser = await utilityFunction.pendingAccountApprovals().then(items => {
        return items;
    });
    
    return response.status(200).json({
        accounts : myUser
    });
};

// exports.getProfilePic = async (req, res) => {
//     await ProfilePics.findOne({_id : req.params.id}).then((img) => {
//         return res.contentType('json').status(200).send(img);
//     }).catch(err => {
//         console.log(err);
//     })
// }