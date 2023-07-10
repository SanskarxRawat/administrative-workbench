const express = require('express'), 
router = express.Router(), 
middlewares = require('../middleware/middleware'), 
DocxController = require('../controllers/DocxCreator/main'),
userRoutes = require('./UserRoutes'),
journalRoutes = require('./JournalRoutes'), 
conferenceRoutes = require('./ConferenceRoutes'),
patentRoutes = require('./PatentRoutes'), 
copyrightRoutes = require('./CopyrightRoutes'),
commonController = require('../controllers/commonController'),
adminController = require('../controllers/AdminController'),
docxCreator = require('../controllers/DocxCreator/main'), 
forgotPassword = require('./forgorPassword');
cacheFunctions = require('../cacheFunctions/mainCache'), 
uf = require('../utils/utilityFunctions');


router.use('/user', userRoutes);

router.use('/forgotPassword', forgotPassword);

router.use(middlewares.isUserLoggedIn);

router.use('/admin/approveAccount', commonController.approveAccount);

router.use('/journal', journalRoutes);

router.use('/conference', conferenceRoutes);

router.use('/patent', patentRoutes);

router.use('/copyright', copyrightRoutes);

router.get('/downloadDocx', DocxController.createDocx);

router.get('/getJournalPapers', commonController.getJournalPapers);

router.get('/getConferencePapers', commonController.getConferencePapers);

router.get('/getPatentPapers', commonController.getPatentPapers);

router.get('/getCopyrightPapers', commonController.getCopyrightPapers);

router.get('/getAllPapers', commonController.getAllPapers);

router.get('/fetchAllUsers',async (req, res) =>  {
    const users = await uf.getUsersList().then((userList) => {
        return userList.map((user) => {
            return {
                _id : user._id, 
                employeeId : user.employeeId, 
                name : user.name,
                role : user.role
            }
        });
    });
    // console.log(users);
    return res.status(200).json({
        users : users   
    });
});

router.get('/admin/getUnapprovedAccounts', adminController.getUnapprovedAccounts);

router.post('/admin/approveAccount', adminController.approveAccount);

router.post('/admin/rejectAccount', adminController.rejectAccount);

// router.post('/approveResearchPaper', middlewares.verifyHOD, commonController.approveResearchPaper);


module.exports = router;