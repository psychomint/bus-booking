const { Stops } = require("../models");
const { get } = require("../routes/operatorsRoutes");

// get all stops for a route
const getStopsByRoute = async (req, res) => {
  const { routeId } = req.params;
  const stops = await Stops.findAll({ 
    where: { 
      routeId 
    }, 
    order: [['sequenceNumber', 'ASC']] });
  res.json(stops);
};

// create stop
const createStop = async (req, res) => {
  const { routeId } = req.params;
  const { city, sequenceNumber } = req.body;
  const stop = await Stops.create({ routeId, city, sequenceNumber });
  res.json(stop);
};

// update stop
const updateStop = async (req, res) => {
  const { id } = req.params;
  const { city, sequenceNumber } = req.body;
  await Stops.update({ city, sequenceNumber }, { where: { id } });
  const updated = await Stops.findByPk(id);
  res.json(updated);
};

// delete stop
const deleteStop = async (req, res) => {
  const { id } = req.params;
  await Stops.destroy({ where: { id } });
  res.json({ message: 'Stop deleted successfully' });
};


module.exports = {
  getStopsByRoute,
  createStop,
  updateStop,
  deleteStop
}