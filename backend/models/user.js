const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Users = sequelize.define('Users',{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    email:{
        type:DataTypes.STRING(255),
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
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
    password:{
        type:DataTypes.TEXT,
        allowNull:false,
    },
    role:{
        type: DataTypes.ENUM('customer','operator_admin','driver','admin'),
        allowNull:false,
        defaultValue:'customer'
    },
    isVerified:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:false
    }
},
{
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    indexes:[
        {
            fields:['created_at'],
        }
    ]
}
);

module.exports = Users;