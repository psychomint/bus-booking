const express = require('express');
const router = express.Router();
const operatorsController = require('../controllers/operatorsControllers');

router.post('/',operatorsController.postOperators);
router.get('/:id',operatorsController.getOperatorById);
router.get('/',operatorsController.getAllOperator);
router.put('/:id',operatorsController.updateOperator);
router.delete('/:id',operatorsController.deleteOperator);

module.exports = router;