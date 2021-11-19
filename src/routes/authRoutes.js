const express = require("express");

const { verifyToken } = require("../middleware/jwt-validate");

const { registro, login, getUsers } = require("../controllers/authController");

const router = express.Router();

router.post("/registro", registro);

router.post("/login", login);

router.get("/usuarios", getUsers);
//router.get("/usuarios",verifyToken, getUsers);
module.exports = router;
