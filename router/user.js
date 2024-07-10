const userController = require('../controller/userController');
const express = require("express");

const router = express.Router();

router.post("/register", userController.RegisterUser);
router.post("/login", userController.LoginUser);
router.post("/loginphone", userController.loginbyphone);
router.put("/saldo/:id", userController.addSaldo);
router.get("/profile/:id", userController.getUserDetail);
router.get('/informasi/saldo/:id', userController.getInformationSaldo)
router.get('/users', userController.getAllUser)

module.exports = router;