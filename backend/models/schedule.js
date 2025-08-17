const {DataTypes} = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Schedules = sequelize.define('Schedules',{
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    busId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'Buses',
            key:'id'
        },
        onDelete:'CASCADE'
    },
    routeId:{
        type:DataTypes.UUID,
        allowNull:false,
        references:{
            model:'Routes',
            key:'id'
        },
        onDelete:'CASCADE'
    },
    departureTime:{
        type: DataTypes.DATE,
        allowNull:false
    },
    arrivalTime:{
        type: DataTypes.DATE,
        allowNull:false
    },
    fareBase:{
        type:DataTypes.DECIMAL,
        allowNull:false
    },
    status:{
        type: DataTypes.ENUM('ACTIVE', 'CANCELLED', 'DELAYED'),
        allowNull: false,
        defaultValue: 'ACTIVE'
    }
},
{
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    indexes:[
        {
            fields:['routeId','departureTime']
        },
        {
        fields: ['routeId','status','departureTime']  
        }
    ]
});

module.exports = Schedules;