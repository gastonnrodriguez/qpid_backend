const express = require("express");

const { verifyToken } = require("../middleware/jwt-validate");

const { register, login, getUsers } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/users", /*verifyToken ,*/getUsers);

module.exports = router;
