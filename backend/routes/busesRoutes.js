const express = require('express');
const router = express.Router();
const busesController = require('../controllers/busesController');

router.post('/',busesController.postBus)
router.get('/:id',busesController.getBusById);
router.get('/',busesController.getAllBus);
router.put('/:id',busesController.updateBus);
router.delete('/:id',busesController.deleteBus)

module.exports = router;