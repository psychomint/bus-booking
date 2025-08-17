const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const ScheduleSeats = sequelize.define('ScheduleSeats', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    scheduleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Schedules', // ya imported Schedules model
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    seatType: {
        type: DataTypes.ENUM('regular', 'window'),
        allowNull: false,
        defaultValue: 'regular'
    },
    status: {
        type: DataTypes.ENUM('available', 'held', 'booked', 'blocked'),
        allowNull: false,
        defaultValue: 'available'
    },
    holdId: {
        type: DataTypes.UUID,
        allowNull: true
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['scheduleId', 'seatNumber'] // ensures no duplicate seats per schedule
        },
        {
            fields: ['scheduleId','status'] // optional, for faster queries on available/held seats
        }
    ]
});

module.exports = ScheduleSeats;
