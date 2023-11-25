var express = require("express");
var router = express.Router();

const escale = require('../controller/escaleController')

router.get('/', escale.findAll)
router.get('/:id', escale.findOne)
router.post('/', escale.create)
router.put('/:id', escale.update)
router.delete('/:id', escale.delete)

module.exports = router;
