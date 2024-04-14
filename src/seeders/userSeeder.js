const userModel = require("../models/user");
const bcrypt = require("bcrypt");

let usersArr = [{
    "email": "test@gmail.com",
    "password": "12345678"
}];

module.exports = {
    run: () =>
        new Promise((resolve) => {
            (async () => {

                for (let user of usersArr) {
                    let userFound = await userModel.findOne({email: user.email, status: 1})
                    if (!userFound){
                       await userModel.create({
                            email: user.email,
                            password: await bcrypt.hash(user.password, 10)
                        });
                    }
                }
                resolve(true);
            })();
        })
};
