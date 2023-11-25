var express = require("express");
var router = express.Router();

const groupeLieu = require('../controller/groupeLieuController')

router.get('/', groupeLieu.findAll)
router.get('/:id', groupeLieu.findOne)
router.post('/', groupeLieu.create)
router.put('/:id', groupeLieu.update)
router.delete('/:id', groupeLieu.delete)

module.exports = router;
