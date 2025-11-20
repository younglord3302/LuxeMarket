const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a product description'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    min: [0, 'Price cannot be negative']
  },
  originalPrice: {
    type: Number,
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Electronics', 'Clothing', 'Books', 'Home & Garden', 'Beauty', 'Sports', 'Other']
  },
  subcategory: {
    type: String
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
    required: true
  },
  images: [{
    url: String,
    public_id: String
  }],
  inventory: {
    type: Number,
    required: true,
    min: [0, 'Inventory cannot be negative'],
    default: 0
  },
  sku: {
    type: String,
    unique: true
  },
  tags: [String],
  features: [String],
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviewCount: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Generate SKU before saving
productSchema.pre('save', async function(next) {
  if (!this.sku) {
    const count = await mongoose.model('Product').countDocuments();
    this.sku = `PROD-${Date.now()}-${count}`;
  }
  next();
});

// Index for better performance
productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ category: 1, subcategory: 1 });
productSchema.index({ vendor: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ rating: -1 });
productSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
