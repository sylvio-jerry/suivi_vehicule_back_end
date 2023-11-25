var express = require("express");
var router = express.Router();

const fcav = require('../controller/fcavController')
/* POST home page. */
router.post("/", fcav.create);
router.get("/", fcav.findAll);
router.get("/:id", fcav.findOne);
router.put("/:id", fcav.update);
router.delete("/:id", fcav.delete);

module.exports = router;
