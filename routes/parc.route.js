var express = require("express");
var router = express.Router();

const parc = require('../controller/parcController')

router.get('/', parc.findAll)
router.get('/:id', parc.findOne)
router.post('/', parc.create)
router.put('/:id', parc.update)
router.delete('/:id', parc.delete)

module.exports = router;
