const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Payments = sequelize.define('Payments', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    bookingId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Bookings',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    provider: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    providerPaymentId: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pending', 'success', 'failed', 'refunded'),
        allowNull: false,
        defaultValue: 'pending'
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            fields: ['bookingId']
        },
        {
            fields: ['status']  // optional, for quick lookup of pending or failed payments
        },
        {
            unique: true,
            fields: ['providerPaymentId']  // ensures each provider transaction is unique
        }
    ]
});

module.exports = Payments;
