const busSeatsModel = require('../models/busSeat');
const busModel = require('../models/bus');


const postBusSeats = async (req,res) => {
    try{
        const {busId, seatNumber, seatType} = req.body;

        if(!busId || !seatNumber || !seatType) {
            return res.status(400).json({ error: "busId, seatNumber and seatType are required" });
        }
        const busCapacity = await busModel.findByPk(busId);
        if(seatNumber > busCapacity.totalSeats) return res.status(401).json({error:'Enter valid seat Number'});

        const busSeatInfo = await busSeatsModel.create({
            busId:busId,
            seatNumber:seatNumber,
            seatType:seatType
        });
        res.status(201).json(busSeatInfo);
    }
    catch(err){
        console.log(err);
        res.status(404).json({error: "Internal Server Error"});
    }
}

const updateBusSeats = async (req,res) => {
    try{
        const {id} = req.params;
        const {seatType} = req.body;
        const [affectedRows] = await busSeatsModel.update(
            {
                seatType:seatType
            },
            {
                where:{
                    id:id
                }
            }
        )
        if(affectedRows === 0) return res.status(200).json({msg:"Seat type already updated"});
        res.status(200).json({updatedRows:affectedRows});
    }
    catch(err){
        console.log(err);
        res.status(404).json({error: "Internal Server Error"});
    }
}

const deleteBusSeats = async (req,res) => {
    try{
        const {id} = req.params;
        const affectedRows = await busSeatsModel.destroy(
            {
                where:{
                    id:id
                }
            }
        )
        if(affectedRows === 0) return res.status(404).json({msg:"Bus seat is not found"});
        res.status(200).json({deletedRows:affectedRows});
    }
    catch(err){
        console.log(err);
        res.status(404).json({error: "Internal Server Error"});
    }
}

const getBusSeats = async (req,res) => {
    try{
        const {busId} = req.query;
        const whereParam = {};
        if(busId) whereParam.busId = busId;
        const busSeatInfo = await busSeatsModel.findAll({
            where:whereParam
        });

        if(busSeatInfo.length === 0 ) return res.status(200).send('No Seats!!! LOL');
        res.status(200).json(busSeatInfo);
    }
    catch(err){
        console.log(err);
        res.status(404).json({error: "Internal Server Error"});
    }
}

module.exports = {
    getBusSeats,
    postBusSeats,
    updateBusSeats,
    deleteBusSeats
}