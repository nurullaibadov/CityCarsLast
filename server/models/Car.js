const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Car = sequelize.define('Car', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    type: {
        type: DataTypes.STRING, // e.g., SUV, Sedan
        allowNull: true
    },
    rating: {
        type: DataTypes.FLOAT,
        defaultValue: 5.0
    },
    transmission: {
        type: DataTypes.STRING,
        defaultValue: 'Automatic'
    },
    fuel: {
        type: DataTypes.STRING,
        defaultValue: 'Petrol'
    },
    seats: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    }
});

module.exports = Car;
