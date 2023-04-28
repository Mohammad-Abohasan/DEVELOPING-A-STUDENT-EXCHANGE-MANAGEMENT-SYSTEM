const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.post('/addNote', offerController.addNote);
router.patch('/editNote', offerController.editNote);
router.get('/publishedOffers', offerController.viewPublishedOffers);
router.get('/archivedOffers', offerController.viewArchivedOffers);

module.exports = router;