const express = require('express');
const { createSchedules, getSchedules, seatHold } = require('../controllers/schedulesControllers');
const router = express.Router();

router.post('/',createSchedules);
router.get('/',getSchedules);
router.post('/:id/hold',seatHold)

module.exports = router;