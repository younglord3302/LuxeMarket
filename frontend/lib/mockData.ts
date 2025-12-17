export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    vendorId: string;
    vendorName: string;
    image: string;
    images: string[];
    rating: number;
    reviewCount: number;
    stock: number;
    featured?: boolean;
    trending?: boolean;
}

export interface Vendor {
    id: string;
    businessName: string;
    description: string;
    logo: string;
    banner: string;
    rating: number;
    totalProducts: number;
    joinedDate: string;
    location: string;
}

export interface Review {
    id: string;
    productId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'customer' | 'vendor' | 'admin';
    vendorId?: string;
}

export interface Order {
    id: string;
    userId: string;
    items: {
        productId: string;
        productName: string;
        quantity: number;
        price: number;
        image: string;
    }[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    shippingAddress: {
        name: string;
        address: string;
        city: string;
        zipCode: string;
        phone: string;
    };
}

// Mock Vendors
export const mockVendors: Vendor[] = [
    {
        id: 'v1',
        businessName: 'TechHub Electronics',
        description: 'Your one-stop shop for the latest electronics and gadgets',
        logo: '/vendors/techhub-logo.png',
        banner: '/vendors/techhub-banner.jpg',
        rating: 4.8,
        totalProducts: 45,
        joinedDate: '2023-01-15',
        location: 'San Francisco, CA'
    },
    {
        id: 'v2',
        businessName: 'Fashion Forward',
        description: 'Trendy clothing and accessories for the modern individual',
        logo: '/vendors/fashion-logo.png',
        banner: '/vendors/fashion-banner.jpg',
        rating: 4.6,
        totalProducts: 120,
        joinedDate: '2023-03-20',
        location: 'New York, NY'
    },
    {
        id: 'v3',
        businessName: 'Home Essentials',
        description: 'Quality home and garden products for every household',
        logo: '/vendors/home-logo.png',
        banner: '/vendors/home-banner.jpg',
        rating: 4.7,
        totalProducts: 78,
        joinedDate: '2023-02-10',
        location: 'Austin, TX'
    },
    {
        id: 'v4',
        businessName: 'Sports Pro',
        description: 'Professional sports equipment and athletic wear',
        logo: '/vendors/sports-logo.png',
        banner: '/vendors/sports-banner.jpg',
        rating: 4.9,
        totalProducts: 65,
        joinedDate: '2023-04-05',
        location: 'Denver, CO'
    },
    {
        id: 'v5',
        businessName: 'Book Haven',
        description: 'Curated collection of books across all genres',
        logo: '/vendors/books-logo.png',
        banner: '/vendors/books-banner.jpg',
        rating: 4.5,
        totalProducts: 200,
        joinedDate: '2023-01-25',
        location: 'Seattle, WA'
    }
];

// Mock Products
export const mockProducts: Product[] = [
    // Electronics
    {
        id: 'p1',
        name: 'Wireless Noise-Cancelling Headphones',
        description: 'Premium over-ear headphones with active noise cancellation, 30-hour battery life, and superior sound quality.',
        price: 299.99,
        originalPrice: 399.99,
        category: 'Electronics',
        vendorId: 'v1',
        vendorName: 'TechHub Electronics',
        image: '/products/headphones.jpg',
        images: ['/products/headphones.jpg', '/products/headphones-2.jpg', '/products/headphones-3.jpg'],
        rating: 4.8,
        reviewCount: 234,
        stock: 45,
        featured: true,
        trending: true
    },
    {
        id: 'p2',
        name: '4K Smart TV 55"',
        description: 'Ultra HD Smart TV with HDR, built-in streaming apps, and voice control.',
        price: 699.99,
        category: 'Electronics',
        vendorId: 'v1',
        vendorName: 'TechHub Electronics',
        image: '/products/tv.jpg',
        images: ['/products/tv.jpg', '/products/tv-2.jpg'],
        rating: 4.6,
        reviewCount: 156,
        stock: 12,
        featured: true
    },
    {
        id: 'p3',
        name: 'Smartphone Pro Max',
        description: 'Latest flagship smartphone with 6.7" OLED display, 5G connectivity, and advanced camera system.',
        price: 1099.99,
        category: 'Electronics',
        vendorId: 'v1',
        vendorName: 'TechHub Electronics',
        image: '/products/smartphone.jpg',
        images: ['/products/smartphone.jpg', '/products/smartphone-2.jpg', '/products/smartphone-3.jpg'],
        rating: 4.9,
        reviewCount: 412,
        stock: 28,
        trending: true
    },
    {
        id: 'p4',
        name: 'Wireless Gaming Mouse',
        description: 'High-precision gaming mouse with customizable RGB lighting and programmable buttons.',
        price: 79.99,
        originalPrice: 99.99,
        category: 'Electronics',
        vendorId: 'v1',
        vendorName: 'TechHub Electronics',
        image: '/products/mouse.jpg',
        images: ['/products/mouse.jpg', '/products/mouse-2.jpg'],
        rating: 4.7,
        reviewCount: 89,
        stock: 67
    },

    // Fashion
    {
        id: 'p5',
        name: 'Classic Leather Jacket',
        description: 'Genuine leather jacket with modern fit, perfect for any season.',
        price: 249.99,
        category: 'Fashion',
        vendorId: 'v2',
        vendorName: 'Fashion Forward',
        image: '/products/jacket.jpg',
        images: ['/products/jacket.jpg', '/products/jacket-2.jpg'],
        rating: 4.5,
        reviewCount: 67,
        stock: 23,
        featured: true
    },
    {
        id: 'p6',
        name: 'Designer Sunglasses',
        description: 'UV protection sunglasses with polarized lenses and stylish frame.',
        price: 159.99,
        originalPrice: 199.99,
        category: 'Fashion',
        vendorId: 'v2',
        vendorName: 'Fashion Forward',
        image: '/products/sunglasses.jpg',
        images: ['/products/sunglasses.jpg', '/products/sunglasses-2.jpg'],
        rating: 4.4,
        reviewCount: 45,
        stock: 56
    },
    {
        id: 'p7',
        name: 'Premium Denim Jeans',
        description: 'Comfortable stretch denim with modern slim fit and premium quality.',
        price: 89.99,
        category: 'Fashion',
        vendorId: 'v2',
        vendorName: 'Fashion Forward',
        image: '/products/jeans.jpg',
        images: ['/products/jeans.jpg'],
        rating: 4.6,
        reviewCount: 123,
        stock: 89,
        trending: true
    },
    {
        id: 'p8',
        name: 'Casual Sneakers',
        description: 'Lightweight and comfortable sneakers for everyday wear.',
        price: 79.99,
        category: 'Fashion',
        vendorId: 'v2',
        vendorName: 'Fashion Forward',
        image: '/products/sneakers.jpg',
        images: ['/products/sneakers.jpg', '/products/sneakers-2.jpg'],
        rating: 4.7,
        reviewCount: 201,
        stock: 145
    },

    // Home & Garden
    {
        id: 'p9',
        name: 'Robot Vacuum Cleaner',
        description: 'Smart robot vacuum with mapping technology and app control.',
        price: 399.99,
        originalPrice: 499.99,
        category: 'Home & Garden',
        vendorId: 'v3',
        vendorName: 'Home Essentials',
        image: '/products/vacuum.jpg',
        images: ['/products/vacuum.jpg', '/products/vacuum-2.jpg'],
        rating: 4.8,
        reviewCount: 178,
        stock: 34,
        featured: true
    },
    {
        id: 'p10',
        name: 'Coffee Maker Deluxe',
        description: 'Programmable coffee maker with thermal carafe and brew strength control.',
        price: 129.99,
        category: 'Home & Garden',
        vendorId: 'v3',
        vendorName: 'Home Essentials',
        image: '/products/coffee-maker.jpg',
        images: ['/products/coffee-maker.jpg'],
        rating: 4.5,
        reviewCount: 92,
        stock: 67
    },
    {
        id: 'p11',
        name: 'Indoor Plant Set',
        description: 'Collection of 5 low-maintenance indoor plants with decorative pots.',
        price: 59.99,
        category: 'Home & Garden',
        vendorId: 'v3',
        vendorName: 'Home Essentials',
        image: '/products/plants.jpg',
        images: ['/products/plants.jpg', '/products/plants-2.jpg'],
        rating: 4.6,
        reviewCount: 56,
        stock: 78
    },
    {
        id: 'p12',
        name: 'Memory Foam Pillow Set',
        description: 'Set of 2 ergonomic memory foam pillows for better sleep.',
        price: 69.99,
        originalPrice: 89.99,
        category: 'Home & Garden',
        vendorId: 'v3',
        vendorName: 'Home Essentials',
        image: '/products/pillows.jpg',
        images: ['/products/pillows.jpg'],
        rating: 4.7,
        reviewCount: 134,
        stock: 112,
        trending: true
    },

    // Sports
    {
        id: 'p13',
        name: 'Yoga Mat Premium',
        description: 'Extra thick non-slip yoga mat with carrying strap.',
        price: 39.99,
        category: 'Sports',
        vendorId: 'v4',
        vendorName: 'Sports Pro',
        image: '/products/yoga-mat.jpg',
        images: ['/products/yoga-mat.jpg', '/products/yoga-mat-2.jpg'],
        rating: 4.8,
        reviewCount: 267,
        stock: 156,
        featured: true
    },
    {
        id: 'p14',
        name: 'Adjustable Dumbbells Set',
        description: 'Space-saving adjustable dumbbells from 5-52.5 lbs.',
        price: 299.99,
        category: 'Sports',
        vendorId: 'v4',
        vendorName: 'Sports Pro',
        image: '/products/dumbbells.jpg',
        images: ['/products/dumbbells.jpg'],
        rating: 4.9,
        reviewCount: 189,
        stock: 23
    },
    {
        id: 'p15',
        name: 'Running Shoes Pro',
        description: 'Professional running shoes with advanced cushioning technology.',
        price: 139.99,
        originalPrice: 179.99,
        category: 'Sports',
        vendorId: 'v4',
        vendorName: 'Sports Pro',
        image: '/products/running-shoes.jpg',
        images: ['/products/running-shoes.jpg', '/products/running-shoes-2.jpg'],
        rating: 4.7,
        reviewCount: 312,
        stock: 89,
        trending: true
    },
    {
        id: 'p16',
        name: 'Sports Water Bottle',
        description: 'Insulated stainless steel water bottle, keeps drinks cold for 24 hours.',
        price: 29.99,
        category: 'Sports',
        vendorId: 'v4',
        vendorName: 'Sports Pro',
        image: '/products/water-bottle.jpg',
        images: ['/products/water-bottle.jpg'],
        rating: 4.6,
        reviewCount: 445,
        stock: 234
    },

    // Books
    {
        id: 'p17',
        name: 'The Art of Programming',
        description: 'Comprehensive guide to modern software development practices.',
        price: 49.99,
        category: 'Books',
        vendorId: 'v5',
        vendorName: 'Book Haven',
        image: '/products/book-programming.jpg',
        images: ['/products/book-programming.jpg'],
        rating: 4.9,
        reviewCount: 523,
        stock: 67,
        featured: true
    },
    {
        id: 'p18',
        name: 'Mystery Novel Collection',
        description: 'Box set of 5 bestselling mystery novels.',
        price: 79.99,
        originalPrice: 99.99,
        category: 'Books',
        vendorId: 'v5',
        vendorName: 'Book Haven',
        image: '/products/mystery-books.jpg',
        images: ['/products/mystery-books.jpg'],
        rating: 4.7,
        reviewCount: 234,
        stock: 45
    },
    {
        id: 'p19',
        name: 'Cookbook: Healthy Meals',
        description: 'Over 200 delicious and nutritious recipes for everyday cooking.',
        price: 34.99,
        category: 'Books',
        vendorId: 'v5',
        vendorName: 'Book Haven',
        image: '/products/cookbook.jpg',
        images: ['/products/cookbook.jpg', '/products/cookbook-2.jpg'],
        rating: 4.8,
        reviewCount: 178,
        stock: 123
    },
    {
        id: 'p20',
        name: 'Science Fiction Epic',
        description: 'Award-winning sci-fi novel that will transport you to another world.',
        price: 24.99,
        category: 'Books',
        vendorId: 'v5',
        vendorName: 'Book Haven',
        image: '/products/scifi-book.jpg',
        images: ['/products/scifi-book.jpg'],
        rating: 4.6,
        reviewCount: 389,
        stock: 234,
        trending: true
    },
    {
        id: 'p21',
        name: 'Business Strategy Guide',
        description: 'Essential reading for entrepreneurs and business leaders.',
        price: 39.99,
        category: 'Books',
        vendorId: 'v5',
        vendorName: 'Book Haven',
        image: '/products/business-book.jpg',
        images: ['/products/business-book.jpg'],
        rating: 4.5,
        reviewCount: 156,
        stock: 89
    },
    {
        id: 'p22',
        name: 'Children\'s Adventure Series',
        description: 'Complete 7-book series perfect for young readers aged 8-12.',
        price: 89.99,
        category: 'Books',
        vendorId: 'v5',
        vendorName: 'Book Haven',
        image: '/products/kids-books.jpg',
        images: ['/products/kids-books.jpg'],
        rating: 4.9,
        reviewCount: 678,
        stock: 56
    }
];

// Mock Reviews
export const mockReviews: Review[] = [
    {
        id: 'r1',
        productId: 'p1',
        userId: 'u1',
        userName: 'John Smith',
        rating: 5,
        comment: 'Amazing sound quality! The noise cancellation works perfectly on flights.',
        date: '2024-11-15',
        verified: true
    },
    {
        id: 'r2',
        productId: 'p1',
        userId: 'u2',
        userName: 'Sarah Johnson',
        rating: 4,
        comment: 'Great headphones, very comfortable for long listening sessions.',
        date: '2024-11-20',
        verified: true
    },
    {
        id: 'r3',
        productId: 'p3',
        userId: 'u3',
        userName: 'Mike Chen',
        rating: 5,
        comment: 'Best smartphone I\'ve ever owned. Camera is incredible!',
        date: '2024-12-01',
        verified: true
    },
    {
        id: 'r4',
        productId: 'p13',
        userId: 'u4',
        userName: 'Emily Davis',
        rating: 5,
        comment: 'Perfect yoga mat! Non-slip and very comfortable.',
        date: '2024-11-28',
        verified: true
    }
];

// Mock Users
export const mockUsers: User[] = [
    {
        id: 'u1',
        name: 'Demo Customer',
        email: 'customer@demo.com',
        role: 'customer'
    },
    {
        id: 'u2',
        name: 'Demo Vendor',
        email: 'vendor@demo.com',
        role: 'vendor',
        vendorId: 'v1'
    },
    {
        id: 'u3',
        name: 'Demo Admin',
        email: 'admin@demo.com',
        role: 'admin'
    }
];

// Helper functions
export const getProductById = (id: string): Product | undefined => {
    return mockProducts.find(p => p.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
    return mockProducts.filter(p => p.category === category);
};

export const getProductsByVendor = (vendorId: string): Product[] => {
    return mockProducts.filter(p => p.vendorId === vendorId);
};

export const getVendorById = (id: string): Vendor | undefined => {
    return mockVendors.find(v => v.id === id);
};

export const getReviewsByProduct = (productId: string): Review[] => {
    return mockReviews.filter(r => r.productId === productId);
};

export const getFeaturedProducts = (): Product[] => {
    return mockProducts.filter(p => p.featured);
};

export const getTrendingProducts = (): Product[] => {
    return mockProducts.filter(p => p.trending);
};

export const getCategories = (): string[] => {
    return Array.from(new Set(mockProducts.map(p => p.category)));
};

export const searchProducts = (query: string): Product[] => {
    const lowerQuery = query.toLowerCase();
    return mockProducts.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery) ||
        p.category.toLowerCase().includes(lowerQuery)
    );
};
