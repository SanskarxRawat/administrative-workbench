const express = require('express'), 
router = express.Router(), 
middlewares = require('../middleware/middleware'), 
journalController = require('../controllers/JournalController');

router.post('/addJournal', middlewares.fileUpload.single('articleFrontPage'), journalController.addJournal);
router.get('/getJournalPapers', journalController.getJournalPapers);
router.post('/updateJournal',middlewares.fileUpload.single('articleFrontPage'), journalController.updateJournalPaper);

module.exports = router;