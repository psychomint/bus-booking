const {DataTypes} = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const BusSeats = sequelize.define('BusSeats',{
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
    seatNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
        validate:{
            min:1,
            max:60
        }
    },
    seatType:{
        type: DataTypes.ENUM('regular','window'),
        allowNull:false,
        defaultValue:'regular'
    }
},
{
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
    indexes:[
        {
            unique:true,
            fields:['busId','seatNumber']
        }
    ]
});

module.exports = BusSeats;

