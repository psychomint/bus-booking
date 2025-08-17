const sequelize = require('../DB/DB_CONNECTION');

// Import all models
const Users = require('./user');
const Operators = require('./operator');
const Buses = require('./bus');
const BusSeats = require('./busSeat');
const Routes = require('./route');
const Stops = require('./stop');
const Schedules = require('./schedule');
const ScheduleSeats = require('./scheduleseat');
const Bookings = require('./booking');
const BookingItems = require('./bookingitem');
const Payments = require('./payment');
const Refunds = require('./refund');

// Define associations
Operators.hasMany(Buses, { foreignKey: 'operatorId' });
Buses.belongsTo(Operators, { foreignKey: 'operatorId' });

Buses.hasMany(BusSeats, { foreignKey: 'busId' });
BusSeats.belongsTo(Buses, { foreignKey: 'busId' });

Routes.hasMany(Stops, { foreignKey: 'routeId' });
Stops.belongsTo(Routes, { foreignKey: 'routeId' });

Buses.hasMany(Schedules, { foreignKey: 'busId' });
Schedules.belongsTo(Buses, { foreignKey: 'busId' });

Routes.hasMany(Schedules, { foreignKey: 'routeId' });
Schedules.belongsTo(Routes, { foreignKey: 'routeId' });

Schedules.hasMany(ScheduleSeats, { foreignKey: 'scheduleId' });
ScheduleSeats.belongsTo(Schedules, { foreignKey: 'scheduleId' });

Users.hasMany(Bookings, { foreignKey: 'userId' });
Bookings.belongsTo(Users, { foreignKey: 'userId' });

Schedules.hasMany(Bookings, { foreignKey: 'scheduleId' });
Bookings.belongsTo(Schedules, { foreignKey: 'scheduleId' });

Bookings.hasMany(BookingItems, { foreignKey: 'bookingId' });
BookingItems.belongsTo(Bookings, { foreignKey: 'bookingId' });

Bookings.hasMany(Payments, { foreignKey: 'bookingId' });
Payments.belongsTo(Bookings, { foreignKey: 'bookingId' });

Payments.hasMany(Refunds, { foreignKey: 'paymentId' });
Refunds.belongsTo(Payments, { foreignKey: 'paymentId' });

// Export all models
module.exports = {
  sequelize,
  Users,
  Operators,
  Buses,
  BusSeats,
  Routes,
  Stops,
  Schedules,
  ScheduleSeats,
  Bookings,
  BookingItems,
  Payments,
  Refunds
};
