var express = require("express");
var router = express.Router();

const fst = require('../controller/fstController')

router.get('/', fst.findAll)
router.get('/new_numero', fst.generateNewNumfst)
router.get('/:id', fst.findOne)
router.post('/', fst.create)
router.put('/:id', fst.update)
router.delete('/:id', fst.delete)

module.exports = router;
