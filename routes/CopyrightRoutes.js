const express = require('express'), 
router = express.Router(), 
middlewares = require('../middleware/middleware'), 
copyrightController = require('../controllers/CopyrightController');

router.post('/addCopyright', middlewares.fileUpload.single('proof'), copyrightController.addCopyright);
router.get('/getCopyrightPapers', copyrightController.getCopyrightPapers);
router.post('/updateCopyright',middlewares.fileUpload.single('proof'), copyrightController.updateCopyrightPaper);

module.exports = router;