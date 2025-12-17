export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  avatar?: string;
  vendorProfile?: string;
}

export interface Vendor {
  _id: string;
  user: User;
  businessName: string;
  description: string;
  logo?: string;
  coverImage?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  contact?: {
    phone: string;
    website: string;
  };
  socialMedia?: {
    facebook: string;
    twitter: string;
    instagram: string;
  };
  isApproved: boolean;
  rating: number;
  totalSales: number;
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  vendor: Vendor;
  images: Array<{
    url: string;
    public_id: string;
  }>;
  inventory: number;
  sku: string;
  tags: string[];
  features: string[];
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: User;
}

export interface Order {
  _id: string;
  customer: User;
  items: Array<{
    product: Product;
    quantity: number;
    price: number;
    vendor: Vendor;
  }>;
  totalAmount: number;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: 'card' | 'paypal';
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  trackingNumber?: string;
  customerNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
  vendor: Vendor;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
}
