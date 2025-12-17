import { Product, User, Order } from './mockData';

export interface CartItem {
    product: Product;
    quantity: number;
}

// Cart Management
export const getCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
};

export const saveCart = (cart: CartItem[]): void => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(cart));
};

export const addToCart = (product: Product, quantity: number = 1): CartItem[] => {
    const cart = getCart();
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }

    saveCart(cart);
    return cart;
};

export const removeFromCart = (productId: string): CartItem[] => {
    const cart = getCart();
    const updatedCart = cart.filter(item => item.product.id !== productId);
    saveCart(updatedCart);
    return updatedCart;
};

export const updateCartQuantity = (productId: string, quantity: number): CartItem[] => {
    const cart = getCart();
    const item = cart.find(item => item.product.id === productId);

    if (item) {
        item.quantity = quantity;
        if (item.quantity <= 0) {
            return removeFromCart(productId);
        }
    }

    saveCart(cart);
    return cart;
};

export const clearCart = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('cart');
};

export const getCartTotal = (): number => {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
};

export const getCartItemCount = (): number => {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
};

// User Session Management
export const getCurrentUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
    if (typeof window === 'undefined') return;
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
        localStorage.removeItem('currentUser');
    }
};

export const logout = (): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('currentUser');
};

export const isAuthenticated = (): boolean => {
    return getCurrentUser() !== null;
};

// Order Management
export const getOrders = (): Order[] => {
    if (typeof window === 'undefined') return [];
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (order: Order): void => {
    if (typeof window === 'undefined') return;
    const orders = getOrders();
    orders.unshift(order); // Add to beginning
    localStorage.setItem('orders', JSON.stringify(orders));
};

export const getUserOrders = (userId: string): Order[] => {
    const orders = getOrders();
    return orders.filter(order => order.userId === userId);
};

// Wishlist Management
export const getWishlist = (): string[] => {
    if (typeof window === 'undefined') return [];
    const wishlist = localStorage.getItem('wishlist');
    return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = (productId: string): void => {
    if (typeof window === 'undefined') return;
    const wishlist = getWishlist();
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }
};

export const removeFromWishlist = (productId: string): void => {
    if (typeof window === 'undefined') return;
    const wishlist = getWishlist();
    const updated = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updated));
};

export const isInWishlist = (productId: string): boolean => {
    const wishlist = getWishlist();
    return wishlist.includes(productId);
};

// Generate Order ID
export const generateOrderId = (): string => {
    return 'ORD-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
