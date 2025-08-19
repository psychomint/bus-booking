const { Schedules, BusSeats, ScheduleSeats, sequelize } = require("../models");
const { Op } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

const getSchedules = async (req, res) => {
  try {
    const { busId, routeId, date, status } = req.query;

    const whereParam = {};

    if (busId) {
      whereParam.busId = busId;
    }

    if (routeId) {
      whereParam.routeId = routeId;
    }

    if (status) {
      whereParam.status = status.toLowerCase();
    }

    if (date) {
      const parsedDate = new Date(date);
      if (isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format. Use YYYY-MM-DD" });
      }

      const startOfDay = new Date(parsedDate.setHours(0, 0, 0, 0));
      const endOfDay = new Date(parsedDate.setHours(23, 59, 59, 999));

      whereParam.departureTime = {
        [Op.between]: [startOfDay, endOfDay],
      };
    }

    const schedules = await Schedules.findAll({ where: whereParam });
    
    if (!schedules || schedules.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(schedules);

  } 
  catch (err) {
    console.error("Error in getSchedules:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const createSchedules = async(req,res) => {
    const transaction = await sequelize.transaction();

    try{
        const {busId, routeId, departureTime, arrivalTime, fareBase, status} = req.body;

        // 1 -> create schedule
        const schedulesInfo = await Schedules.create({
            busId, 
            routeId, 
            departureTime, 
            arrivalTime, 
            fareBase, 
            status
        },{
            transaction
        });
        // 2 -> fetech bus seat 
        const busSeatById = await BusSeats.findAll({
            where:{
                busId:busId
            },
            transaction
        })
        if(!busSeatById || busSeatById.length === 0) {
            return res.status(404).json({error:"No seat template found for this bus"});
            }

        
        // 3. Generate ScheduleSeats from template
        const scheduleSeatsData = busSeatById.map((seat) => ({
            scheduleId: schedulesInfo.id,
            seatNumber: seat.seatNumber,
            seatType: seat.seatType,
            status: "available"
        }))

        await ScheduleSeats.bulkCreate(scheduleSeatsData, {transaction});

        // 4. Commit transaction
        await transaction.commit();

        res.status(201).json({
            message: "Schedule created successfully",
            schedulesInfo,
            });
    }
    catch(err){
        await transaction.rollback(); 
        console.log(err);
        res.status(500).json({error:"Internal Server Error"});
    }
}

//const getSchedulesById = async(req,res) => {
    //}

// const updateSchedules = async(req,res) => {
//     try{
//         const {id} = req.params;

//     }
//     catch(err){
//         console.log(err);
//         res.status(500).json({error:"Internal Server Error"});
//     }
// }


// const deleteSchedules = async(req,res) => {
    //}


// ------------------------------------------
//|               Pending Work               |
// ------------------------------------------
//ScheduleSeat (per-schedule seats)
// Endpoints (public/admin)

// GET /schedules/:schedule_id/seatmap — public — returns array of seats { seat_no, seat_type, status, hold_id?, expires_at? }

// GET /admin/schedules/:schedule_id/seats — admin full data

// (No direct create — created via Schedule creation)

// PUT /admin/schedules/:schedule_id/seats/:seat_no — admin forced changes (rare)

const seatHold = async(req,res) => {
    const transaction = await sequelize.transaction();
    try {
        const { id: scheduleId } = req.params; // scheduleId from URL
        const { seats } = req.body; // e.g. [1, 2, 3]

        // console.log(id,scheduleId);

        if (!Array.isArray(seats) || seats.length === 0) {
        return res.status(400).json({ message: "Seats array required" });
        }

        // Generate unique holdId for this request
        const holdId = uuidv4();
        const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 5 mins expiry

        // STEP 1: Lock and check all requested seats
        const seatRecords = await ScheduleSeats.findAll({
        where: {
            scheduleId,
            seatNumber: seats
        },
        lock: true,
        skipLocked: true,
        transaction
        });

        // Validation: All requested seats must exist
        if (seatRecords.length !== seats.length) {
        await transaction.rollback();
        return res.status(404).json({ message: "Some seats not found" });
        }

        // Validation: All must be available
        const unavailable = seatRecords.filter(s => s.status !== "available");
        if (unavailable.length > 0) {
        await transaction.rollback();
        return res.status(409).json({ message: "Some seats are not available", seats: unavailable });
        }

        // STEP 2: Update seats → set to held
        for (const seat of seatRecords) {
        seat.status = "held";
        seat.holdId = holdId;
        seat.expiresAt = expiresAt;
        await seat.save({ transaction });
        }

        // Commit transaction
        await transaction.commit();

        res.json({
        message: "Seats held successfully",
        holdId,
        seats,
        expiresAt
        });

    }
    catch (error) {
    await transaction.rollback();
    console.error("Error holding seats:", error);
    res.status(500).json({ message: "Failed to hold seats" });
  }
}







module.exports = {
    createSchedules,
    getSchedules,
    seatHold
}