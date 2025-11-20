const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  businessName: {
    type: String,
    required: [true, 'Please add a business name'],
    unique: true,
    maxlength: [100, 'Business name cannot exceed 100 characters']
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  logo: {
    type: String,
    default: 'default-vendor-logo.png'
  },
  coverImage: {
    type: String
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  contact: {
    phone: String,
    website: String
  },
  socialMedia: {
    facebook: String,
    twitter: String,
    instagram: String
  },
  commissionRate: {
    type: Number,
    default: 15 // 15% commission
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalSales: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better performance
vendorSchema.index({ businessName: 1 });
vendorSchema.index({ isApproved: 1 });
vendorSchema.index({ rating: -1 });

module.exports = mongoose.model('Vendor', vendorSchema);
