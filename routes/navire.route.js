var express = require("express");
const app = require("../app");
var router = express.Router();

const navire = require('../controller/navireController')

router.get('/', navire.findAll)
router.get('/:id', navire.findOne)
router.post('/', navire.create)
router.put('/:id', navire.update)
router.delete('/:id', navire.delete)

module.exports = router;
