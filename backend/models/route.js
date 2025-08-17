const {DataTypes} = require('sequelize');
const sequelize = require('../DB/DB_CONNECTION');

const Routes = sequelize.define('Routes',{
    id:{
        type:DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey:true,
    },
    name:{
        type:DataTypes.STRING(55),
        allowNull:false
    }
},
{
    timestamps:true,
    createdAt:'created_at',
    updatedAt:'updated_at',
});

module.exports = Routes;