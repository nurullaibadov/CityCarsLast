const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: 'user' // 'user' or 'admin' 
    },
    isBlacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    resetPasswordToken: DataTypes.STRING,
    resetPasswordExpires: DataTypes.DATE,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    address: DataTypes.STRING
});

module.exports = User;
