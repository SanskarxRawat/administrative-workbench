const express = require('express'), 
router = express.Router(), 
middlewares = require('../middleware/middleware'), 
conferenceController = require('../controllers/ConferenceController');

router.post('/addConference', middlewares.fileUpload.single('articleFrontPage'), conferenceController.addConference);
router.get('/getConferencePapers', conferenceController.getConferencePapers);
router.post('/updateConference',middlewares.fileUpload.single('articleFrontPage'), conferenceController.updateConferencePaper);

module.exports = router;