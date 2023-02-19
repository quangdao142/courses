const express = require("express");
const router = express.Router();

const loginController = require("../app/controllers/LoginController");

router.get("/login", loginController.login);
router.post("/login", loginController.loginAuth);
router.get("/logout", loginController.logoutAuth);

module.exports = router;
