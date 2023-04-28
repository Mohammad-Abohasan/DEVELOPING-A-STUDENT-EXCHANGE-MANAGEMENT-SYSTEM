const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.get('/requests', studentController.viewRequests);
router.patch('/cancelRequest', studentController.cancelRequest);
router.get('/availableOffers', studentController.viewAvailableOffers);
router.post('/submitOffer', studentController.submitOffer);

router.get('/interest', studentController.viewInterests);
router.post('/addInterest', studentController.addInterest);
router.patch('/updateInterest', studentController.updateInterest);
router.delete('/removeInterest', studentController.cancelInterest);
router.post('/interestOffers', studentController.getInterestOffer);

module.exports = router;