const express = require('express');
const router = express.Router();
const offerController = require('../controllers/offerController');
const verifyJWT = require('../middleware/verifyJWT');

// router.use(verifyJWT);

router.post('/addNotes', offerController.addNotes);
router.patch('/editNotes', offerController.editNotes);

router.get('/publishedOffers', offerController.viewPublishedOffers);
router.get('/pendingOffers', offerController.viewPendingOffers);
router.get('/archivedOffers', offerController.viewArchivedOffers);

router.get('/studentList', offerController.viewStudentList);
router.get('/studentArchive', offerController.viewStudentArchive);
router.get('/assignStudent', offerController.assignStudent);

module.exports = router;