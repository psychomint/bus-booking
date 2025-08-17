const express = require('express');
const router = express.Router();
const busSeatsController = require('../controllers/busSeatsControllers');


router.post('/',busSeatsController.postBusSeats);
router.put('/:id',busSeatsController.updateBusSeats);
router.delete('/:id',busSeatsController.deleteBusSeats);
router.get('/',busSeatsController.getBusSeats);

module.exports = router;