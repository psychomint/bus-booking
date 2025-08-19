const { Routes, Stops } = require("../models");


const getAllRoutes = async (req, res) => {
  try {
    const routes = await Routes.findAll();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const getRouteById = async (req, res) => {
  const {id} = req.params;
  try {
    const route = await Routes.findByPk(id, {
      include: [
        {
          model: Stops,
          as: "Stops",
          order: [["sequenceNumber", "ASC"]],
        },
      ],
    });

    if (!route) return res.status(404).json({ message: "Route not found" });

    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const createRoute = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) return res.status(400).json({ message: "Name is required" });

    const route = await Routes.create({ name });
    res.status(201).json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const updateRoute = async (req, res) => {
  try {
    const { name } = req.body;
    const route = await Routes.findByPk(req.params.id);

    if (!route) return res.status(404).json({ message: "Route not found" });

    route.name = name || route.name;
    await route.save();

    res.json(route);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteRoute = async (req, res) => {
  try {
    const route = await Routes.findByPk(req.params.id);

    if (!route) return res.status(404).json({ message: "Route not found" });

    await route.destroy();
    res.json({ message: "Route deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



module.exports = {
    createRoute,
    updateRoute,
    deleteRoute,
    getRouteById,
    getAllRoutes
}