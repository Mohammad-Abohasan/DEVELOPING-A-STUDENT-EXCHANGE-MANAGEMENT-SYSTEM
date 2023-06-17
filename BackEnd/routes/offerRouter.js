const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.post('/addNotes', offerController.addNotes);
router.post('/editNotes', offerController.editNotes);

router.get('/publishedOffers', offerController.viewPublishedOffers);
router.get('/publishedOffers/:offerID', offerController.viewPublishedOfferDetails);
router.get('/pendingOffers', offerController.viewPendingOffers);
router.get('/pendingOffers/:offerID', offerController.viewPendingOfferDetails);
router.get('/archivedOffers', offerController.viewArchivedOffers);
router.get('/archivedOffers/:offerID', offerController.viewArchivedOfferDetails);

router.get('/studentList/:offerID', offerController.viewStudentList);
router.get('/studentArchive/:studentID', offerController.viewStudentArchive);
router.get('/studentDetails/:studentID', offerController.viewStudentDetails);
router.post('/assignStudent/:studentID/:offerID', offerController.assignStudent);

module.exports = router;