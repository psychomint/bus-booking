const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const BookingItems = sequelize.define('BookingItems', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    bookingId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Bookings', // ya imported Bookings model
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    seatNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    passengerName: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            unique: true,
            fields: ['bookingId', 'seatNumber']  // ensures no duplicate seat in same booking
        }
    ]
});

module.exports = BookingItems;
