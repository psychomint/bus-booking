const busesModel = require('../models/bus');
const operatorModel = require('../models/operator');

const isValidBusId = async(id) =>{
    try{
        const busIdExist = await busesModel.findByPk(id);
        return (busIdExist) ? true : false;
    }
    catch(err){
        console.log(err);
        return false;
    }
}

const postBus = async(req,res) => {
    try{
        const {operator_id, registration_no, total_seats} = req.body;

        const operatorExists = await operatorModel.findByPk(operator_id);
        if(!operatorExists) return res.status(400).json({error:"Invalid Operator"});

        const checkRegistrationNumber = await busesModel.findOne({
            where:{
                registrationNumber:registration_no
            }
        })
        if(checkRegistrationNumber) return res.status(409).json({error: "Registration Number already exist"});

        const busInfo = await busesModel.create({
            operatorId:operator_id,
            registrationNumber:registration_no,
            totalSeats:total_seats
        })
        
        if(!busInfo) return res.status(404).send("Can not able to store in DB");
        
        res.status(201).json(busInfo);
    }
    catch(err){
        console.log(err);
        res.status(500).send({error: err.errors[0].message || 'Internal Server Error'});
    }
}

const getBusById = async(req,res) => {
    try{
        const {id} = req.params;
        if(!await isValidBusId(id)) return res.status(400).json({ error: 'Invalid bus_id' });
        const busInfo = await busesModel.findByPk(id);
        if(!busInfo) return res.status(404).send('User not found');
        res.status(200).json(busInfo);
    }
    catch(err){
        console.log(err);
        res.status(404).send('Internal Server Error');
    }
}

const getAllBus = async(req,res) => {
    try{
        const busesInfo = await busesModel.findAll();
        if(busesInfo.length === 0) return res.status(200).json({msg:"You have not any bus! Sad :( "})
        res.status(200).json(busesInfo);
    }
    catch(err){
        console.log(err);
        res.status(404).json({error: "Internal Server Error"});
    }
}

const updateBus = async (req,res) => {
    try{
        const {id} = req.params;
        const {total_seats} = req.body;
        if(!await isValidBusId(id)) return res.status(400).json({ error: 'Invalid bus_id' });
        const [affectedCount] = await busesModel.update(
            {
                totalSeats:total_seats
            },
            {
                where:{
                    id:id
                }
            }
        )
        if(affectedCount === 0) return res.status(200).json({msg:"Seat already updated"});
        res.status(200).json({updatedRows:affectedCount});
    }
    catch(err){
        console.log(err);
        res.status(404).json({error:"Internal Server Error"});
    }
}

const deleteBus = async (req,res) => {
    try{
        const {id} = req.params;
        if(!await isValidBusId(id)) return res.status(400).json({ error: 'Invalid bus_id' });
        const deletedBus = await busesModel.destroy({
            where:{
                id:id
            }
        });
        if(deletedBus === 0) return res.status(404).send('Bus not found');
        return res.status(200).json({ deletedRows: deletedBus });
    }
    catch(err){
        console.log(err);
        res.status(404).json({error:"Internal Server Error"});
    }
}

module.exports = {
    postBus,
    getBusById,
    getAllBus,
    updateBus,
    deleteBus
}