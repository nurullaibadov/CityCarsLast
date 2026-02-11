const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Driver = sequelize.define('Driver', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    experience: DataTypes.INTEGER,
    rating: DataTypes.FLOAT,
    languages: DataTypes.STRING, // Store as comma-separated string
    price: DataTypes.FLOAT,
    available: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    rides: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    specialties: {
        type: DataTypes.STRING, // Store as comma-separated string
        defaultValue: ''
    },
    isBlacklisted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

module.exports = Driver;
