const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const verifyJWT = require('../middleware/verifyJWT');

router.get('/requests', verifyJWT, studentController.viewRequests);
router.post('/cancelRequest', studentController.cancelRequest);
router.get('/availableOffers', verifyJWT, studentController.viewAvailableOffers);
router.post('/submitOffer', verifyJWT, studentController.submitOffer);

module.exports = router;