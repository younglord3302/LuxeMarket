# 🌟 Multi-Vendor E-Commerce Platform

A complete, production-ready multi-vendor e-commerce platform built with modern web technologies. This platform allows multiple vendors to sell their products through a unified marketplace with a seamless shopping experience for customers.

## 🚀 Live Demo

- **Frontend**: [https://yoursite.com](https://yoursite.com) (Replace with your deployed URL)
- **Backend API**: [https://api.yoursite.com](https://api.yoursite.com) (Replace with your deployed URL)

## 📋 Features

### Core Features
- ✅ **Multi-Vendor Support**: Multiple independent vendors can sell through the platform
- ✅ **User Authentication**: JWT-based authentication with role management (Customer/Vendor/Admin)
- ✅ **Vendor Management**: Application process with admin approval for vendor accounts
- ✅ **Product Catalog**: Advanced product management with categorization and inventory
- ✅ **Shopping Cart**: Persistent cart with localStorage and real-time updates
- ✅ **Checkout & Orders**: Complete order processing with payment integration ready
- ✅ **Order Management**: Customer order history and vendor order fulfillment dashboards

### Advanced Features
- ✅ **Reviews & Ratings**: 5-star rating system with verified purchase reviews
- ✅ **Advanced Search**: Multi-filter search with price ranges, ratings, and categories
- ✅ **Analytics Dashboard**: Sales metrics and review analytics for vendors
- ✅ **Responsive Design**: Mobile-first design with Tailwind CSS
- ✅ **Real-time Inventory**: Automatic stock management on order placement

### Technical Features
- ✅ **Modern Stack**: Next.js 14, Node.js, Express, MongoDB, TypeScript
- ✅ **RESTful API**: Well-documented endpoints with proper error handling
- ✅ **Security**: Input validation, authentication, and authorization
- ✅ **Scalability**: Modular architecture ready for production scaling

## 🛠️ Technology Stack

### Backend
- **Node.js** with Express.js framework
- **MongoDB** with Mongoose ODM
- **JWT Authentication** for secure session management
- **bcryptjs** for password hashing
- **express-validator** for input validation

### Frontend
- **Next.js 14** (App Router) with TypeScript
- **Tailwind CSS** for responsive styling
- **React Context** for state management
- **Axios** for API communication

### DevOps
- **Environment Configuration** for different deployment stages
- **Git Version Control** with proper .gitignore
- **Nodemon** for backend development
- **ESLint** for code quality

## 🏗️ Project Structure

```
multi-vendor-ecommerce/
├── backend/                          # API Server
│   ├── src/
│   │   ├── models/                  # MongoDB Models (User, Vendor, Product, Order, Review)
│   │   ├── routes/                  # API Routes (auth, vendors, products, orders, reviews)
│   │   ├── middleware/              # Authentication & authorization middleware
│   │   └── controllers/             # Business logic controllers
│   ├── server.js                    # Express server configuration
│   ├── package.json                 # Backend dependencies
│   └── .env                         # Environment variables
│
├── frontend/                         # React Application
│   ├── app/                         # Next.js app directory
│   │   ├── (auth)/                  # Authentication pages
│   │   ├── (vendor)/                # Vendor dashboard pages
│   │   ├── products/                # Product-related pages
│   │   ├── vendors/                 # Vendor public pages
│   │   └── contexts/                # React contexts (Auth, Cart)
│   ├── components/                  # Reusable UI components
│   ├── types/                       # TypeScript type definitions
│   ├── lib/                         # Utility functions and API client
│   ├── package.json                 # Frontend dependencies
│   └── .env.local                   # Frontend environment variables
│
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
└── package.json                     # Root package.json (optional)
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed
- **MongoDB** installed locally or MongoDB Atlas account
- **Git** for version control
- **npm** or **yarn** package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/multi-vendor-ecommerce.git
   cd multi-vendor-ecommerce
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   cp .env.example .env  # Configure your environment variables
   npm start             # Start development server (port 5000)
   ```

3. **Set up Frontend** (in separate terminal)
   ```bash
   cd ../frontend
   npm install
   cp .env.local.example .env.local  # Configure API URL
   npm run dev           # Start development server (port 3000)
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - API Health Check: http://localhost:5000/api/health

### Environment Setup

#### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/multi_vendor_ecommerce
JWT_SECRET=your_super_secret_jwt_key_here_make_it_very_long_and_random
JWT_EXPIRE=30d
FRONTEND_URL=http://localhost:3000
```

#### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## 📖 Usage Guide

### For Customers
1. **Browse Products**: Explore products from all vendors with advanced filters
2. **Vendor Discovery**: View vendor profiles and their store pages
3. **Shopping**: Add items to cart, proceed to checkout
4. **Order Tracking**: Monitor order status through your dashboard
5. **Reviews**: Rate and review products you've purchased

### For Vendors
1. **Apply**: Register as a customer first, then apply to become a vendor
2. **Setup Store**: Create your business profile and get admin approval
3. **Product Management**: Add/edit/update your product catalog
4. **Order Fulfillment**: Process customer orders and update status
5. **Analytics**: Track sales performance and customer reviews

### For Admins
1. **User Management**: Approve vendor applications
2. **Platform Oversight**: Monitor platform activity
3. **Content Management**: Manage categories and featured products

## 🔧 Development Scripts

### Backend Scripts
```bash
cd backend
npm start          # Start production server
npm run dev        # Start development server with nodemon
```

### Frontend Scripts
```bash
cd frontend
npm run dev        # Start Next.js development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
```

## 🚢 Deployment

### Backend Deployment
```bash
# Build for production
cd backend
npm run build

# Deploy to platforms like Heroku, Railway, or DigitalOcean
# Make sure to set production environment variables
```

### Frontend Deployment
```bash
# Build and deploy
cd frontend
npm run build

# Deploy to Vercel, Netlify, or any static hosting
# Configure build command: npm run build
# Build output directory: .next
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Write clear commit messages
- Test all features thoroughly
- Follow the existing code style
- Document new features in README

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Vendor Endpoints
- `GET /api/vendors` - Get approved vendors
- `POST /api/vendors/apply` - Apply for vendor account
- `GET /api/vendors/profile/my` - Get vendor profile

### Product Endpoints
- `GET /api/products` - Get products with filters
- `POST /api/products` - Create product (vendor only)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Order Endpoints
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get user orders
- `GET /api/orders/vendor/my-orders` - Get vendor orders

### Review Endpoints
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally or use MongoDB Atlas
   - Check MONGODB_URI in backend/.env

2. **JWT Token Issues**
   - Verify JWT_SECRET is set and strong
   - Check token expiration settings

3. **CORS Errors**
   - Ensure FRONTEND_URL matches your frontend URL
   - Check CORS configuration in server.js

4. **Build Errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version (18+ required)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with love and modern web technologies
- Inspired by real-world e-commerce platforms
- Thank you to the open-source community

## 📞 Contact

**Project Creator**: Your Name
- GitHub: [@yourusername](https://github.com/yourusername)
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile](https://linkedin.com/in/yourprofile)

**Project Link**: [https://github.com/yourusername/multi-vendor-ecommerce](https://github.com/yourusername/multi-vendor-ecommerce)

---

**⭐ If you found this project helpful, please give it a star!**
# LuxeMarket
