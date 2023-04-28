const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.post('/addNotes', offerController.addNotes);
router.patch('/editNotes', offerController.editNotes);
router.get('/publishedOffers', offerController.viewPublishedOffers);
router.get('/archivedOffers', offerController.viewArchivedOffers);

module.exports = router;