
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    category: string;
    images: string[];
    rating: number;
    reviewsCount: number;
    vendorId: string;
    vendorName: string;
    stock: number;
    isNew?: boolean;
    isFeatured?: boolean;
}

export interface Vendor {
    id: string;
    name: string;
    description: string;
    logo: string;
    banner: string;
    rating: number;
    productsCount: number;
    joinedDate: string;
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
    avatar?: string;
    addresses?: Address[];
}

export interface Address {
    id: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    isDefault: boolean;
}

export interface Order {
    id: string;
    userId: string;
    items: CartItem[];
    total: number;
    status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
    date: string;
    shippingAddress: Address;
}

export interface CartItem {
    productId: string;
    quantity: number;
    product: Product;
}

export const CATEGORIES = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
    "Beauty",
    "Toys"
];

export const MOCK_VENDORS: Vendor[] = [
    {
        id: "v1",
        name: "TechWorld Official",
        description: "Premium electronics and gadgets directly from manufacturers.",
        logo: "https://images.unsplash.com/photo-1531297461136-820727139904?auto=format&fit=crop&q=80&w=200&h=200",
        banner: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&q=80&w=1200&h=400",
        rating: 4.8,
        productsCount: 150,
        joinedDate: "2023-01-15"
    },
    {
        id: "v2",
        name: "Fashion Hub",
        description: "Trendy clothing and accessories for everyone.",
        logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=200&h=200",
        banner: "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=80&w=1200&h=400",
        rating: 4.5,
        productsCount: 320,
        joinedDate: "2023-03-20"
    },
    {
        id: "v3",
        name: "Green Living",
        description: "Eco-friendly home and garden products.",
        logo: "https://images.unsplash.com/photo-1416872928419-48715e4f597e?auto=format&fit=crop&q=80&w=200&h=200",
        banner: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&q=80&w=1200&h=400",
        rating: 4.9,
        productsCount: 85,
        joinedDate: "2023-02-10"
    },
    {
        id: "v4",
        name: "Sports Pro",
        description: "Professional equipment for all your sporting needs.",
        logo: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=200&h=200",
        banner: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200&h=400",
        rating: 4.6,
        productsCount: 200,
        joinedDate: "2023-05-05"
    },
    {
        id: "v5",
        name: "Bookworm's Paradise",
        description: "A vast collection of books across all genres.",
        logo: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&q=80&w=200&h=200",
        banner: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=1200&h=400",
        rating: 4.7,
        productsCount: 500,
        joinedDate: "2023-01-01"
    }
];

export const MOCK_PRODUCTS: Product[] = [
    // Electronics
    {
        id: "p1",
        name: "Ultra Noise-Cancelling Headphones",
        description: "Experience silence with our top-tier noise cancelling technology. 30-hour battery life and premium sound quality.",
        price: 299.99,
        originalPrice: 349.99,
        category: "Electronics",
        images: [
            "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.8,
        reviewsCount: 124,
        vendorId: "v1",
        vendorName: "TechWorld Official",
        stock: 45,
        isFeatured: true
    },
    {
        id: "p2",
        name: "Smart Watch Series X",
        description: "Advanced health monitoring, GPS tracking, and seamless connectivity with your smartphone.",
        price: 199.99,
        category: "Electronics",
        images: [
            "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.6,
        reviewsCount: 89,
        vendorId: "v1",
        vendorName: "TechWorld Official",
        stock: 30,
        isNew: true
    },
    {
        id: "p3",
        name: "4K Action Camera",
        description: "Capture your adventures in stunning 4K resolution. Waterproof and durable design.",
        price: 149.50,
        originalPrice: 199.50,
        category: "Electronics",
        images: [
            "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.5,
        reviewsCount: 56,
        vendorId: "v1",
        vendorName: "TechWorld Official",
        stock: 15
    },
    // Fashion
    {
        id: "p4",
        name: "Classic Leather Jacket",
        description: "Timeless style meets modern comfort. Genuine leather with premium stitching.",
        price: 189.00,
        category: "Fashion",
        images: [
            "https://images.unsplash.com/photo-1551028919-ac7bcb7d01b5?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1520975661595-6453be3f7070?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.7,
        reviewsCount: 42,
        vendorId: "v2",
        vendorName: "Fashion Hub",
        stock: 25,
        isFeatured: true
    },
    {
        id: "p5",
        name: "Designer Sunglasses",
        description: "Protect your eyes with style. UV400 protection and polarized lenses.",
        price: 129.99,
        originalPrice: 159.99,
        category: "Fashion",
        images: [
            "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.4,
        reviewsCount: 38,
        vendorId: "v2",
        vendorName: "Fashion Hub",
        stock: 50
    },
    {
        id: "p6",
        name: "Running Shoes",
        description: "Lightweight and breathable running shoes for maximum performance.",
        price: 89.95,
        category: "Fashion",
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.8,
        reviewsCount: 200,
        vendorId: "v2",
        vendorName: "Fashion Hub",
        stock: 100,
        isNew: true
    },
    // Home & Garden
    {
        id: "p7",
        name: "Modern Ceramic Vase",
        description: "Elegant ceramic vase to enhance your home decor. Handcrafted design.",
        price: 45.00,
        category: "Home & Garden",
        images: [
            "https://images.unsplash.com/photo-1581783342308-f792ca11df53?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.9,
        reviewsCount: 15,
        vendorId: "v3",
        vendorName: "Green Living",
        stock: 20
    },
    {
        id: "p8",
        name: "Bamboo Plant Stand",
        description: "Sustainable bamboo stand for your indoor plants. Easy to assemble.",
        price: 35.50,
        category: "Home & Garden",
        images: [
            "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.6,
        reviewsCount: 28,
        vendorId: "v3",
        vendorName: "Green Living",
        stock: 40
    },
    // Sports
    {
        id: "p9",
        name: "Yoga Mat Professional",
        description: "Non-slip surface with perfect cushioning for your yoga practice.",
        price: 49.99,
        category: "Sports",
        images: [
            "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.8,
        reviewsCount: 75,
        vendorId: "v4",
        vendorName: "Sports Pro",
        stock: 60,
        isFeatured: true
    },
    {
        id: "p10",
        name: "Adjustable Dumbbells Set",
        description: "Space-saving adjustable dumbbells ranging from 5 to 52.5 lbs.",
        price: 299.00,
        originalPrice: 350.00,
        category: "Sports",
        images: [
            "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.9,
        reviewsCount: 45,
        vendorId: "v4",
        vendorName: "Sports Pro",
        stock: 10
    },
    // Books
    {
        id: "p11",
        name: "The Art of Coding",
        description: "Master the fundamentals of programming clearly and concisely.",
        price: 29.99,
        category: "Books",
        images: [
            "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.7,
        reviewsCount: 30,
        vendorId: "v5",
        vendorName: "Bookworm's Paradise",
        stock: 80
    },
    {
        id: "p12",
        name: "Cooking Masterclass",
        description: "100 delicious recipes from top chefs around the world.",
        price: 34.50,
        category: "Books",
        images: [
            "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=800"
        ],
        rating: 4.8,
        reviewsCount: 55,
        vendorId: "v5",
        vendorName: "Bookworm's Paradise",
        stock: 40,
        isNew: true
    },
    // More products to reach 20+
    {
        id: "p13",
        name: "Wireless Gaming Mouse",
        description: "High precision sensor and ergonomic design for gamers.",
        price: 69.99,
        category: "Electronics",
        images: ["https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=800"],
        rating: 4.5, reviewsCount: 65, vendorId: "v1", vendorName: "TechWorld Official", stock: 35
    },
    {
        id: "p14",
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches.",
        price: 89.99,
        category: "Electronics",
        images: ["https://images.unsplash.com/photo-1587829741301-dc798b91a603?auto=format&fit=crop&q=80&w=800"],
        rating: 4.7, reviewsCount: 92, vendorId: "v1", vendorName: "TechWorld Official", stock: 25
    },
    {
        id: "p15",
        name: "Denim Jacket",
        description: "Classic blue denim jacket for casual outings.",
        price: 79.50,
        category: "Fashion",
        images: ["https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=800"],
        rating: 4.3, reviewsCount: 22, vendorId: "v2", vendorName: "Fashion Hub", stock: 45
    },
    {
        id: "p16",
        name: "Silk Scarf",
        description: "Luxurious 100% silk scarf with floral pattern.",
        price: 45.00,
        category: "Fashion",
        images: ["https://images.unsplash.com/photo-1584030373081-f37b7bb4fa3e?auto=format&fit=crop&q=80&w=800"],
        rating: 4.6, reviewsCount: 18, vendorId: "v2", vendorName: "Fashion Hub", stock: 20
    },
    {
        id: "p17",
        name: "Succulent Trio",
        description: "Set of 3 easy-care succulents in ceramic pots.",
        price: 29.99,
        category: "Home & Garden",
        images: ["https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?auto=format&fit=crop&q=80&w=800"],
        rating: 4.9, reviewsCount: 35, vendorId: "v3", vendorName: "Green Living", stock: 50
    },
    {
        id: "p18",
        name: "Garden Tools Set",
        description: "Heavy duty gardening tools with ergonomic handles.",
        price: 59.99,
        category: "Home & Garden",
        images: ["https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&q=80&w=800"],
        rating: 4.7, reviewsCount: 40, vendorId: "v3", vendorName: "Green Living", stock: 25
    },
    {
        id: "p19",
        name: "Tennis Racket",
        description: "Professional grade lightweight tennis racket.",
        price: 159.00,
        category: "Sports",
        images: ["https://images.unsplash.com/photo-1617083934555-ac7d4fee8909?auto=format&fit=crop&q=80&w=800"],
        rating: 4.5, reviewsCount: 28, vendorId: "v4", vendorName: "Sports Pro", stock: 15
    },
    {
        id: "p20",
        name: "Camping Tent",
        description: "Waterproof 4-person tent for outdoor adventures.",
        price: 199.99,
        category: "Sports",
        images: ["https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?auto=format&fit=crop&q=80&w=800"],
        rating: 4.6, reviewsCount: 52, vendorId: "v4", vendorName: "Sports Pro", stock: 12
    },
    {
        id: "p21",
        name: "Sci-Fi Novel",
        description: "A gripping tale of space exploration and mystery.",
        price: 19.99,
        category: "Books",
        images: ["https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&q=80&w=800"],
        rating: 4.4, reviewsCount: 15, vendorId: "v5", vendorName: "Bookworm's Paradise", stock: 60
    }
];

export const MOCK_USERS: User[] = [
    {
        id: "u1",
        name: "John Doe",
        email: "customer@example.com",
        role: "customer",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
        addresses: [
            {
                id: "a1",
                street: "123 Main St",
                city: "New York",
                state: "NY",
                zipCode: "10001",
                country: "USA",
                isDefault: true
            }
        ]
    },
    {
        id: "u2",
        name: "Tech Admin",
        email: "admin@example.com",
        role: "admin",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin"
    },
    {
        id: "v1_user",
        name: "TechWorld Manager",
        email: "vendor@techworld.com",
        role: "vendor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech"
    }
];

export const MOCK_REVIEWS: Review[] = [
    {
        id: "r1",
        productId: "p1",
        userId: "u3",
        userName: "Alice Smith",
        rating: 5,
        comment: "These headphones are amazing! The noise cancellation is top notch.",
        date: "2023-11-15",
        verified: true
    },
    {
        id: "r2",
        productId: "p1",
        userId: "u4",
        userName: "Bob Jones",
        rating: 4,
        comment: "Great sound, but a bit heavy on the ears after long use.",
        date: "2023-10-20",
        verified: true
    }
];
