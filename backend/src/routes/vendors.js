const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Vendor = require('../models/Vendor');
const User = require('../models/User');

const router = express.Router();

// Apply for vendor account
router.post('/apply', protect, async (req, res) => {
  try {
    const { businessName, description, address, contact } = req.body;

    // Check if user already has a vendor profile
    const existingVendor = await Vendor.findOne({ user: req.user.id });
    if (existingVendor) {
      return res.status(400).json({ message: 'You already have a vendor application' });
    }

    // Create vendor profile
    const vendor = await Vendor.create({
      user: req.user.id,
      businessName,
      description,
      address,
      contact
    });

    // Update user role to vendor (pending approval)
    await User.findByIdAndUpdate(req.user.id, {
      role: 'vendor',
      vendorProfile: vendor._id
    });

    res.status(201).json({
      success: true,
      message: 'Vendor application submitted successfully',
      vendor
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all vendors (public)
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find({ isApproved: true })
      .populate('user', 'name email avatar')
      .select('-commissionRate')
      .sort({ rating: -1 });

    res.json({ success: true, vendors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single vendor (public)
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id)
      .populate('user', 'name email avatar')
      .select('-commissionRate');

    if (!vendor || !vendor.isApproved) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get my vendor profile (protected - vendor only)
router.get('/profile/my', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user.id })
      .populate('user', 'name email avatar');

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor profile not found' });
    }

    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update vendor profile (protected - vendor only)
router.put('/profile', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const vendor = await Vendor.findOneAndUpdate(
      { user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    ).populate('user', 'name email avatar');

    res.json({ success: true, vendor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Admin routes for vendor management
router.get('/admin/pending', protect, authorize('admin'), async (req, res) => {
  try {
    const pendingVendors = await Vendor.find({ isApproved: false })
      .populate('user', 'name email');

    res.json({ success: true, vendors: pendingVendors });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

router.put('/admin/approve/:id', protect, authorize('admin'), async (req, res) => {
  try {
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { isApproved: true },
      { new: true }
    ).populate('user', 'name email');

    res.json({ success: true, message: 'Vendor approved successfully', vendor });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
