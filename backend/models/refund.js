const { DataTypes } = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Refunds = sequelize.define('Refunds', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    paymentId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: 'Payments', // ya imported Payments model
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    reason: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('requested', 'processed', 'rejected'),
        allowNull: false,
        defaultValue: 'requested'
    }
}, {
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
        {
            fields: ['paymentId']
        },
        {
            fields: ['status']  // optional, for faster lookup of requested refunds
        }
    ]
});

module.exports = Refunds;
