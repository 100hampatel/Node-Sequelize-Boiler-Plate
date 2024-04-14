const express = require("express");
const router = express.Router();
const userController = require("../../controller/v1/userController");
const {userAuth} = require("../../middleware/verifyToken")


router.post("/login",userController.logIn)
router.post("/change-password",userAuth,userController.changePassword)
router.post('/logout', userAuth, userController.logOut);

module.exports = router
