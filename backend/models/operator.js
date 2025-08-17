const {DataTypes} = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Operators = sequelize.define('Operators',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    name:{
        type:DataTypes.STRING(55),
        allowNull:false
    },
    phone:{
        type:DataTypes.STRING(10),
        allowNull:false,
        unique:true,
        validate: {
            is: /^[0-9]+$/i,   
        }
    },
    rating:{
        type:DataTypes.DECIMAL(3,2),
        allowNull:false,
        validate:{
            min:0,
            max:5
        }
    }
},
{
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
});

module.exports = Operators;