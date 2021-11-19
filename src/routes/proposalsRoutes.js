const express = require("express");

const router = express.Router();

const { verifyToken } = require("../middleware/jwt-validate");
const { getProposals } = require("../controllers/proposalsController");



router.post("/", getProposals);
module.exports = {
  router,
};
