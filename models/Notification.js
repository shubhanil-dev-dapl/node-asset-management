// models/Notification.js
"use strict";

const secrets = [

];

module.exports = function (sequelize, DataTypes) {
    const Notification = sequelize.define(
        "notifications",
        {
            id, notifiedTo, notificationMessage, notifiedDateTime, deletedAt
        },
        {
            timestamps: true,
            paranoid: true,
        }
    );

    Notification.prototype.purge = function () {
        const clean = {};
        for (const key of Object.keys(this.dataValues)) {
            if (!secrets.includes(key)) {
                clean[key] = this.dataValues[key];
            }
        }
        return clean;
    };

    return Notification;
};