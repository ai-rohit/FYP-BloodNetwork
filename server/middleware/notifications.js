const { Expo } = require("expo-server-sdk");
const db = require("../dbconfig");

const getToken = async function (userId) {
  try {
    await db.query(
      "Select notificationToken from user_details where userId = ?",
      [userId],
      async (error, result) => {
        if (error) return;
        return await result[0].notificationToken;
      }
    );
  } catch (ex) {
    console.log(ex.message);
  }
};

const sendPushNotification = async (targetExpoPushToken, title, message) => {
  const expo = new Expo();
  const chunks = expo.chunkPushNotifications([
    {
      to: targetExpoPushToken,
      sound: "default",
      title: title,
      body: message,
      data: { _displayInForeground: true },
    },
  ]);
  //console.log(targetExpoPushToken);
  let tickets = [];
  (async () => {
    for (let chunk of chunks) {
      try {
        console.log("about to send");
        let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        console.log("back from send");
        console.log(ticketChunk);
        tickets.push(...ticketChunk);
        console.log("ticket chunk pushed");
      } catch (error) {
        console.log("sendPushNotificationsAsync Error");
        console.error(error);
      }
    }
  })();
};

module.exports.sendPushNotification = sendPushNotification;
module.exports.getToken = getToken;
