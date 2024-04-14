const app = require("express")();
//v1
const userRoute = require("./v1/userRoutes");
const customerRoute = require("./v1/coustomerRoutes");

app.use("/api/v1/user",userRoute)
app.use("/api/v1/customer",customerRoute)



module.exports = app
