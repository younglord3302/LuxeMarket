const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Order = require('../models/Order');

const router = express.Router();

// Create a new order
router.post('/', protect, async (req, res) => {
  try {
    const order = await Order.create({
      ...req.body,
      customer: req.user.id
    });

    await order.populate([
      { path: 'items.product', select: 'name images' },
      { path: 'items.vendor', select: 'businessName' }
    ]);

    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user's orders
router.get('/my-orders', protect, async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id })
      .populate('items.product', 'name images')
      .populate('items.vendor', 'businessName')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get vendor's orders
router.get('/vendor/my-orders', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const orders = await Order.find({ 'items.vendor': req.vendor._id })
      .populate('customer', 'name email')
      .populate('items.product', 'name images')
      .sort({ createdAt: -1 });

    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single order
router.get('/:id', protect, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('customer', 'name email')
      .populate('items.product', 'name images')
      .populate('items.vendor', 'businessName');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if user owns the order or is a vendor in the order
    const isCustomer = order.customer._id.toString() === req.user.id;
    const isVendor = order.items.some(item =>
      item.vendor._id.toString() === req.vendor?._id.toString()
    );

    if (!isCustomer && !isVendor && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update order status (vendor only)
router.put('/:id/status', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const { status, trackingNumber } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Check if vendor is in this order
    const vendorInOrder = order.items.some(item =>
      item.vendor.toString() === req.vendor._id.toString()
    );

    if (!vendorInOrder && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied' });
    }

    order.status = status;
    if (trackingNumber) order.trackingNumber = trackingNumber;

    await order.save();
    await order.populate('items.vendor', 'businessName');

    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
