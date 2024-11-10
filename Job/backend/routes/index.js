const express = require('express');
const router = express.Router();
const userSignUpController = require("../controller/userSignUp");
const userSignInController = require("../controller/userSignIn");
const userDetailsController = require('../controller/userDetails');
const authToken = require('../middleware/authToken');
const userLogout = require('../controller/userLogout');

// User routes
router.post("/signup", userSignUpController); // POST /api/signup
router.post("/signin", userSignInController); // POST /api/signin
router.get("/user-details", authToken, userDetailsController); // GET /api/user-details
router.get("/userLogout", userLogout); // GET /api/userLogout


module.exports = router;
