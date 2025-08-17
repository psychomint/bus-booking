const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Bookings = sequelize.define('Bookings', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Users', // ya imported Users model
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    scheduleId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Schedules',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    status: {
        type: DataTypes.ENUM('held', 'confirmed', 'cancelled', 'failed'),
        allowNull: false,
        defaultValue: 'held'
    },
    totalAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
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
            fields: ['userId']
        },
        {
            fields: ['scheduleId']
        },
        {
            fields: ['status']  // optional, for fast lookup of held/confirmed bookings
        }
    ]
});

module.exports = Bookings;
