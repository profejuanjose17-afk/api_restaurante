const express = require("express");
const authenticate = require("../middlewares/auth.middleware");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.get(
    "/perfil",
    authenticate,
    authController.perfil
);
                
router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;