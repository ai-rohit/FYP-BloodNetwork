const express = require("express");
const { isLoggedIn } = require("../middleware/user-authentication");
const db = require("../dbconfig");
const axios = require("axios");
const router = express.Router();
const notification = require("../middleware/notifications");
const { Expo } = require("expo-server-sdk");
const {
  sendPushNotification,
  getToken,
} = require("../middleware/notifications");
// const {Expo} = require("expo-server-sdk");
// const expo = new Expo();

// let savedPushTokens = [];

// const hndlePushTokens = ({title, body})=>{
//     let notifications = [];
//     for (let pushToken of savedPushTokens){
//         if(!Expo.isExpoPushToken(pushToken)){
//             console.log("Not a valid token!");
//             continue;
//         }

// //         notifications.push({
// //             to: pushToken,
// //             sound: "default",
// //             title: title,
// //             body: body,
// //             data: {body}
// //         });
// //     }
// //     let chunks = expo.chunkPushNotifications(notifications);

// //     (async ()=>{
// //         for(let chunk of chunks){
// //             try{
// //                 let receipts = await expo.sendPushNotificationsAsync(chunk);
// //                 console.log(receipts)
// //             }catch(error){
// //                 console.log(error.message);
// //             }
// //         }
// //     })();
// // }

// const sendPushNotifiction = async (targetExpoPushToken, message) => {
//   const expo = new Expo();
//   const chunks = expo.chunkPushNotifications([
//     {
//       to: targetExpoPushToken,
//       sound: "default",
//       body: message,
//       data: { _displayInForeground: true },
//     },
//   ]);
//   console.log(targetExpoPushToken);
//   let tickets = [];
//   (async () => {
//     for (let chunk of chunks) {
//       try {
//         console.log("about to send");
//         let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
//         console.log("back from send");
//         console.log(ticketChunk);
//         tickets.push(...ticketChunk);
//         console.log("ticket chunk pushed");
//       } catch (error) {
//         console.log("sendPushNotificationsAsync Error");
//         console.error(error);
//       }
//     }
//   })();
// };

router.put("/pushTokens", isLoggedIn, async (req, res) => {
  try {
    const token = req.body.token;
    const userId = req.user.userId;
    await db.query(
      "Update user_details set notificationToken = ? where userId = ?",
      [token, userId],
      (error, result) => {
        if (error) {
          return res.send({ status: "error", message: error.message });
        }
        return res.send({
          status: "success",
          data: { Token: "Token updated" },
        });
      }
    );
  } catch (ex) {
    return res.send({ status: "error", message: ex.message });
  }
});

router.post("/sendNotification", async (req, res) => {
  sendPushNotification(
    (targetExpoPushToken = "ExponentPushToken[yYU4iPFaeTH4T_ShjfDQ_u]"),
    (message = "Hello")
  );
});

router.put("/delete_token", async (req, res) => {
  try {
    db.query(
      "Update user_details set notificationToken = ?",
      [null],
      (error, result) => {
        if (error) {
          return res.send({ status: "error", message: error.message });
        }
        return res.send({
          status: "success",
          data: { Token: "Updated successfully" },
        });
      }
    );
  } catch (ex) {
    return res.send({ status: "error", message: ex.message });
  }
});

module.exports = router;
