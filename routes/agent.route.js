var express = require("express");
var router = express.Router();

const agent = require('../controller/agentController')

router.post("/", agent.create);
router.get("/", agent.findAll);
router.get("/:id", agent.findOne);
router.put("/:id", agent.update);
router.delete("/:id", agent.delete);

module.exports = router;
