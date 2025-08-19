const express = require('express');
const router = express.Router();
const stopsController = require('../controllers/stopsControllers');



router.get('/routes/:routeId/stops', stopsController.getStopsByRoute);


router.post('/routes/:routeId/stops', stopsController.createStop);


router.put('/stops/:id', stopsController.updateStop);


router.delete('/stops/:id', stopsController.deleteStop);

module.exports = router;
