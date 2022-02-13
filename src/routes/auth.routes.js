const { Router } = require("express");
const router = Router();
const authControllers = require("../controllers/auth.controllers");
const { isAuthenticated, isNotAuthenticated } = require("../middlewares/authentication");

// Login
router.get("/login", isNotAuthenticated, authControllers.login);
router.post("/login", isNotAuthenticated, authControllers.postLogin);

// Sign up
router.get("/signup", isNotAuthenticated, authControllers.signUp);
router.post("/signup", isNotAuthenticated, authControllers.postSignUp);

// Logout
router.get("/logout", isAuthenticated, authControllers.logout);

module.exports = router;
