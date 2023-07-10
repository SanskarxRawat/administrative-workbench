const express = require('express'), 
router = express.Router(), 
middlewares = require('../middleware/middleware'), 
fpController = require('../controllers/forgotPasswordController');

router.post('/verifyEmployeeId', fpController.verifyEmployeeID);
router.post('/verifyOTP', fpController.verifyOTP);
router.post('/resetPassword', fpController.resetPassword);

module.exports = router;