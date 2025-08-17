const {DataTypes} = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Stop = sequelize.define('Stop',{
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
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

    city:{
        type:DataTypes.STRING(55),
        allowNull:false
    },

    sequenceNumber:{
        type:DataTypes.INTEGER,
        allowNull:false,
    }
},
{
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
});

module.exports = Stop;