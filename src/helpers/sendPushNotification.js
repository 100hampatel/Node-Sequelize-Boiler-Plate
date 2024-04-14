const {SERVER_KEY, ACTIVE_STATUS} = require("../../config/key");
const FCM = require('fcm-node');
let fcm = new FCM(SERVER_KEY);
const userTokenModel = require("../models/userToken")
const notificationModel = require("../models/notification")
const userModel = require("../models/user")
const helper = require("./helper");
const {Op} = require("sequelize");

module.exports.sendNotification = async (userId, actionText, title, body, data) => {
    console.log("data-->",data)
    if (userId.length > 0) {
        const deviceToken = await userTokenModel.findAll({where: {userId: {[Op.in]: userId}, status: ACTIVE_STATUS}})
        let deviceTokenArr = [];

        let userFound;

        const userData = await userModel.findAll({where: {userId: {[Op.in]: userId}, status: ACTIVE_STATUS}});
        if(userData.length > 0){
            for (let user of userData) {
                const notificationList = await notificationModel.findAll({where:{requestId:data.id,userId:user.userId,status:ACTIVE_STATUS}})
                if(notificationList.length > 0) await notificationModel.update({isDisable:true},{where:{requestId:data.id,userId:user.userId,status:ACTIVE_STATUS}})

                await notificationModel.create({
                    title: data.titleEn,
                    titleSp: data.titleSp,
                    message: data.bodyEn,
                    messageSp: data.bodySp,
                    isRead : false,
                    userId: user.userId,
                    notificationType: data.type,
                    requestId : data.id,
                    requestUserId : data?.requestUserId?data.requestUserId:"",
                    image : data.image
                });
            }
        }

        if (deviceToken.length > 0) {
            for (let ele of deviceToken) {
                deviceTokenArr.push(ele.deviceToken);
                userFound = await userModel.findOne({where: {userId: ele.userId, status:ACTIVE_STATUS}});
                // console.log("userFound------>",userFound.firstName,"Language----------->",userFound.language)

                if(userFound.notification === true) {
                    let message = {
                        registration_ids: deviceTokenArr,

                        notification: {
                            priority: "high",
                            title:  userFound.language === "es" ? data.titleSp  : data.titleEn,
                            body: userFound.language === "es" ? data.bodySp  : data.bodyEn,
                            actionText : userFound.language === "es"  ? data.actionTextSp  : data.actionTextEn,
                            sound: "default"
                        },
                        data: {
                            priority: "high",
                            notificationType: data.type,
                            requestId: data.id.toString(),
                            title:  data.titleEn ,
                            titleSp: data.titleSp,
                            message: data.bodyEn  ,
                            messageSp: data.bodySp,
                            actionText: data.actionTextEn,
                            actionTextSp: data.actionTextSp,
                            image: data?.image ? helper.imageURL(data.image,'user') : helper.imageURL("defaultUser.png", 'user'),
                            requestUserId : data?.requestUserId ? data.requestUserId.toString():"",
                            sessionStartTime : data?.sessionStartTime ? (new Date(data.sessionStartTime)).getTime().toString():"",
                            sessionEndTime : data?.sessionEndTime ? (new Date(data.sessionEndTime)).getTime().toString():"",
                            isSessionStarted : data?.sessionEndTime ? true:false,
                            isSessionEnded : data?.sessionEndTime ? true:false
                        },
                        priority: "high",
                        timeToLive: 60 * 60 * 24,
                    };

                    console.log("notification-------", message.notification)
                    console.log("notification------data-------", message.data)

                    // console.log("registration_ids-------", message.registration_ids)

                    fcm.send(message, function (err, response) {
                        if (err) {
                            console.log("Something has gone wrong!", err);
                        } else {
                            console.log("Successfully sent with response: ", response);
                        }
                    });
                    deviceTokenArr = []
                }
            }

        }
    }
}
