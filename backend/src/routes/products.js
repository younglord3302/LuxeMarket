const express = require('express');
const { protect, authorize } = require('../middleware/auth');
const Product = require('../models/Product');
const Vendor = require('../models/Vendor');

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { category, vendor, search, page = 1, limit = 12 } = req.query;

    let query = { isActive: true };

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by vendor
    if (vendor) {
      query.vendor = vendor;
    }

    // Search by name or description
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }

    const products = await Product.find(query)
      .populate('vendor', 'businessName logo rating')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(query);

    res.json({
      success: true,
      products,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('vendor', 'businessName logo rating address contact socialMedia');

    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create product (protected - vendor only)
router.post('/', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    // Check if vendor is approved
    const vendor = await Vendor.findOne({ user: req.user.id });
    if (!vendor || !vendor.isApproved) {
      return res.status(403).json({ message: 'Vendor account not approved' });
    }

    const product = await Product.create({
      ...req.body,
      vendor: vendor._id
    });

    await product.populate('vendor', 'businessName logo');

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update product (protected - vendor only)
router.put('/:id', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if vendor owns this product or is admin
    const vendor = await Vendor.findOne({ user: req.user.id });
    if (product.vendor.toString() !== vendor._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this product' });
    }

    product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('vendor', 'businessName logo');

    res.json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete product (protected - vendor only)
router.delete('/:id', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if vendor owns this product or is admin
    const vendor = await Vendor.findOne({ user: req.user.id });
    if (product.vendor.toString() !== vendor._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this product' });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get vendor's products (protected - vendor only)
router.get('/vendor/my-products', protect, authorize('vendor', 'admin'), async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ user: req.user.id });
    const products = await Product.find({ vendor: vendor._id })
      .sort({ createdAt: -1 });

    res.json({ success: true, products });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get categories (public)
router.get('/public/categories', async (req, res) => {
  try {
    const categories = await Product.distinct('category', { isActive: true });
    res.json({ success: true, categories });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
