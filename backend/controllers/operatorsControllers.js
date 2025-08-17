const operatorModel = require('../models/operator');
const { Op } = require('sequelize');

const postOperators = async (req,res) => {
    try{
        const {name, phone, rating} = req.body;
        const operatorsInfo = await operatorModel.create({
            name:name,
            phone:phone,
            rating:rating
        })
        res.status(201).json(operatorsInfo);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
    
}

const getOperatorById = async (req,res) => {
    try{
        const {id} = req.params;
        const operatorInfo = await operatorModel.findByPk(id);
        if (!operatorInfo) {
            return res.status(404).json({ error: 'Operator not found' });
        }
        res.status(200).json(operatorInfo);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const getAllOperator = async (req,res) => {
    try{
        const {name, rating} = req.query;

        const whereParam = {};
        if(name) whereParam.name = name;
        if(rating) whereParam.rating = {
            [Op.gte]:rating
        }

        const usersInfo = await operatorModel.findAll({
            where:whereParam
        });

        if(usersInfo.length === 0) return res.status(404).json({ error: 'Users not found' });
        res.status(200).json(usersInfo);
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error')
    }
}

const updateOperator = async (req,res) => {
    try{
        const {id} = req.params;
        const {name} = req.body;
        const [affectedCount] = await operatorModel.update(
            {name:name},
            {
                where:{
                    id:id
                }
            }
        );
        if (affectedCount === 0) {
            return res.status(404).send('User not found');
        }
        res.status(200).json({ updatedRows: affectedCount });
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

const deleteOperator = async (req,res) => {
    try{
        const {id} = req.params;
        const deletedOpeator = await operatorModel.destroy({
            where:{
                id:id
            }
        });
        if(deletedOpeator === 0) return res.status(404).send('User not found');
        res.status(200).json({ updatedRows: deletedOpeator });
    }
    catch(err){
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    postOperators,
    getOperatorById,
    getAllOperator,
    updateOperator,
    deleteOperator
}