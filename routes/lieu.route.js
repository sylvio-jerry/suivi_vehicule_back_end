var express = require("express");
var router = express.Router();

const lieu = require('../controller/lieuController')

router.get('/', lieu.findAll)
router.get('/:id', lieu.findOne)
router.post('/', lieu.create)
router.put('/:id', lieu.update)
router.delete('/:id', lieu.delete)

module.exports = router;
