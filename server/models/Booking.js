const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Booking = sequelize.define('Booking', {
    pickupDate: DataTypes.STRING,
    pickupTime: DataTypes.STRING,
    returnDate: DataTypes.STRING,
    returnTime: DataTypes.STRING,
    pickupLocation: DataTypes.STRING,
    returnLocation: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    insurance: DataTypes.STRING,
    gps: DataTypes.BOOLEAN,
    childSeat: DataTypes.BOOLEAN,
    additionalDriver: DataTypes.BOOLEAN,
    paymentMethod: DataTypes.STRING,
    carId: DataTypes.INTEGER,
    totalPrice: DataTypes.FLOAT,
    driverName: DataTypes.STRING,
    vehicleName: DataTypes.STRING,
    progress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'pending' // pending, confirmed, cancelled, in_transit, completed
    }
});

module.exports = Booking;
