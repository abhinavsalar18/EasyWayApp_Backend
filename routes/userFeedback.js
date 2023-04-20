const { Router } = require("express");
const express = require("express");
const userFeedback_controller = require("../controllers/userFeedback.js");
const router = express.Router();

router.route("/feedback").post(userFeedback_controller);

module.exports = router;