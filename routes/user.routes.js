const router = require("express").Router();
const User = require("../models/user.model");
const { addCount } = require("../controllers/user.controllers");

router.get("/", addCount);
module.exports = router;
