const express = require("express");
const router = express.Router();
const customerController = require("../../controller/v1/customerController");
const {userAuth} = require("../../middleware/verifyToken")


router.post("/add-customer",userAuth,customerController.addCustomer)
router.post("/get-customer",userAuth,customerController.getCustomer)
router.post("/edit-customer",userAuth,customerController.editCustomer)


// router.post("/change-password",userAuth,customerController.changePassword)
// router.post('/logout', userAuth, customerController.logOut);

module.exports = router
