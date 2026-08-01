const User = require('../models/User');
const Order = require('../models/Order');
const Reservation = require('../models/Reservation');

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private/Admin
const getOrders = async (req, res) => {
  try {
    const now = Date.now();
    const thirtySecsAgo = new Date(now - 30 * 1000);
    const sixtySecsAgo = new Date(now - 60 * 1000);

    // Auto update orders: Pending -> Cooking after 30 seconds
    await Order.updateMany(
      { status: 'Pending', createdAt: { $lte: thirtySecsAgo } },
      { $set: { status: 'Cooking' } }
    );

    // Auto update orders: Cooking -> Ready after another 30 seconds (60 seconds total)
    await Order.updateMany(
      { status: 'Cooking', createdAt: { $lte: sixtySecsAgo } },
      { $set: { status: 'Ready' } }
    );

    const orders = await Order.find({}).populate('userId', 'name email').sort('-createdAt');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

// @desc    Get all reservations
// @route   GET /api/admin/reservations
// @access  Private/Admin
const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({}).populate('userId', 'name email').sort('-date');
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching reservations', error: error.message });
  }
};

module.exports = {
  getUsers,
  getOrders,
  getReservations
};
