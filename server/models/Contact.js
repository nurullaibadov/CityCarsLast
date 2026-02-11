const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Contact = sequelize.define('Contact', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    subject: DataTypes.STRING,
    message: DataTypes.TEXT,
    read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Contact;
