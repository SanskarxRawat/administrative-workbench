const User = require("../models/User");
const passport = require('passport');
const jwt = require('jsonwebtoken');
const utilityFunctions = require('../utils/utilityFunctions');
const path = require('path');
const multer = require('multer');
const {GridFsStorage} = require('multer-gridfs-storage');
const crypto = require('crypto');
const JournalPapers = require("../models/Journal");
const ConferencePapers = require("../models/Journal");
const PatentPapers = require("../models/Journal");
const CopyrightPapers = require("../models/Journal");
const util = require('util');
const fs = require('fs');


exports.validateSignup = (request, response, next) => {
    request.check('email', 'Email Required.').notEmpty();
    request.check('role', 'Role Required.').notEmpty();
    request.check('employeeId', 'Employee Id Required.').notEmpty();
    request.check('password', 'Password Required.').notEmpty();
    request.check('name', 'Name Required.').notEmpty();

    if(!request.check('employeeId')) {
            request.check('employeeId', 'Invalid Employee Id.').isLength({
            min : 8, 
            max : 8
        });
    }

    if(!request.check('email')) {
        request.check('email', 'Invalid Email.').isEmail();
        request.sanitizeBody('email').normalizeEmail({
            all_lowercase : true
        }).trim();
    }

    request.getValidationResult().then((error) => {
        if(!error.isEmpty()) {
            console.log(error.array());
           return response.status(406).json({error : error.array()});
        } else {
            next();
        }
    });
};

exports.validateLogin = (request, response, next) => {
    if(!request.body.employeeId){
        return response.status(406).json({
            error : "EmployeeId cannot be empty."
        });
    }
    if(!request.body.password){
        return response.status(406).json({
            error : "Password cannot be empty."
        });
    }
    if(!request.body.role){
        return response.status(406).json({
            error : "Role cannot be empty."
        });
    }
    return next();
}

exports.verifyAdmin = async (request, response, next) => {
    const user = await utilityFunctions.findUserByEmployeeId(request.user.employeeId);
    if(user.role != 'Admin'){
        return response.status(400).json({
            error : "You are not authorized to access this particular information"
        });
    }
    return next();
};

exports.verifyHOD = async (req, res, next) => {
    const user = await utilityFunctions.findUserByEmployeeId(req.user.employeeId);
    if(user.role != "HOD"){
        return res.status(400).json({
            error : "You are not authorized to access this particular information"
        });
    }
    return next();
}

exports.isUserLoggedIn = (request, response, next) => {
    if(request.isAuthenticated()){
        next();
    } else {
        // console.log("pavan");
        return response.status(401).send({
            message : "User not logged in.", 
            url : '/'
        });
    }
}

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, 'pdf_files')
    }, 
    filename : async (req, file, cb) => {
        const ext = path.extname(file.originalname.toString());
        const ranString = await crypto.randomBytes(16).toString('hex');
        const id = req.user.employeeId + ranString;
        const filePath = id + ext;
        console.log(filePath);
        cb(null, filePath);
    }
});

var upload = multer({ storage });

exports.fileUpload = upload;

const storagePP = multer.diskStorage({
    destination : function(req, res, cb) {
        cb(null, 'profilePics');
    }, 
    filename : async(req, file, cb) => {
        const ext = path.extname(file.originalname.toString());
        const id = req.body.employeeId;
        const filePath = id + ext;
        console.log(filePath);
        cb(null, filePath);
    }
});         

const uploadProfilePic = multer({storage : storagePP});

exports.profilePicUpload = uploadProfilePic;