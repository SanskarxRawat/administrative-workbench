const express = require('express'), 
router = express.Router(), 
middlewares = require('../middleware/middleware'), 
userController = require('../controllers/userController');

router.post('/login',userController.login);
router.post('/signup',middlewares.profilePicUpload.single('profilePic'), userController.signup);
router.post('/verifyEmployeeId', userController.forgotPassword);
router.put('/resetPassword', userController.resetPassword);
router.get('/pendingAccountApprovals',middlewares.verifyAdmin, userController.pendingAccountApprovals);
router.get('/logout', userController.logout);

module.exports = router;