const {DataTypes} = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Buses = sequelize.define('Buses',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },

    operatorId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'Operators',
            key:'id'
        },
        onDelete:'CASCADE'
    },
    registrationNumber:{
        type:DataTypes.STRING(12),
        allowNull:false,
        unique:true,
        validate: {
        is: /^[A-Z]{2}[0-9]{1,3}[A-Z]{1,3}[0-9]{1,4}$/,  // Regex validation
        isValidFormat(value) {
            if (!/^[A-Z]{2}[0-9]{1,3}[A-Z]{1,3}[0-9]{1,4}$/.test(value)) {
                throw new Error('Invalid vehicle registration number format. Example: KA01AB1234');
            }
            }
        },
        set(value) {
            // Normalize value before saving
            const normalized = String(value).toUpperCase().replace(/[^A-Z0-9]/g, '');
            this.setDataValue('registrationNumber', normalized);
        }
    },

    totalSeats:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:20,
            max:60
        }
    }
},
{
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
});

module.exports = Buses;