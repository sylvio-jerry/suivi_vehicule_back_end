var express = require("express");
var router = express.Router();

const vehicule = require('../controller/vehiculeController')

router.get('/', vehicule.findAll)
router.get('/:id', vehicule.findOne)
router.post('/', vehicule.create)
router.put('/:id', vehicule.update)
router.delete('/:id', vehicule.delete)

module.exports = router;
