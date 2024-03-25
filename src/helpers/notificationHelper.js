const Notification = require('../../models/Notification');

const sendNotification = async (notifiedTo, notificationMessage, notifiedDateTime) => {
    const notification = new Notification({
        notifiedTo,
        notificationMessage,
        notifiedDateTime
    });
    await notification.save();
    return notification;
};
module.exports = { sendNotification }