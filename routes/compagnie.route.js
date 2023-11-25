var express = require("express");
var router = express.Router();

const compagnie = require('../controller/compagnieController')

router.get('/', compagnie.findAll)
router.get('/:id', compagnie.findOne)
router.post('/', compagnie.create)
router.put('/:id', compagnie.update)
router.delete('/:id', compagnie.delete)

module.exports = router;
