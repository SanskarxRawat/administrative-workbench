const express = require('express'), 
router = express.Router(), 
middlewares = require('../middleware/middleware'), 
patentController = require('../controllers/PatentController');

router.post('/addPatent', middlewares.fileUpload.single('proof'), patentController.addPatent);
router.get('/getPatentPapers', patentController.getPatentPapers);
router.post('/updatePatent',middlewares.fileUpload.single('proof'), patentController.updatePatentPaper);


module.exports = router;