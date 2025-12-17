
import { CartItem, User, Order } from './mockData';

const STORAGE_KEYS = {
    CART: 'mv_cart',
    USER: 'mv_user',
    ORDERS: 'mv_orders',
    WISHLIST: 'mv_wishlist',
    THEME: 'mv_theme'
};

export const loadCart = (): CartItem[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : [];
};

export const saveCart = (cart: CartItem[]) => {
    if (typeof window === 'undefined') return;
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
};

export const loadUser = (): User | null => {
    if (typeof window === 'undefined') return null;
    const stored = localStorage.getItem(STORAGE_KEYS.USER);
    return stored ? JSON.parse(stored) : null;
};

export const saveUser = (user: User | null) => {
    if (typeof window === 'undefined') return;
    if (user) {
        localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    } else {
        localStorage.removeItem(STORAGE_KEYS.USER);
    }
};

export const loadOrders = (userId?: string): Order[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.ORDERS);
    const allOrders: Order[] = stored ? JSON.parse(stored) : [];
    if (userId) {
        return allOrders.filter(o => o.userId === userId);
    }
    return allOrders;
};

export const saveOrder = (order: Order) => {
    if (typeof window === 'undefined') return;
    const orders = loadOrders();
    orders.unshift(order);
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
};

export const loadWishlist = (): string[] => {
    if (typeof window === 'undefined') return [];
    const stored = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return stored ? JSON.parse(stored) : [];
};

export const toggleWishlist = (productId: string): boolean => {
    if (typeof window === 'undefined') return false;
    let wishlist = loadWishlist();
    const exists = wishlist.includes(productId);
    if (exists) {
        wishlist = wishlist.filter(id => id !== productId);
    } else {
        wishlist.push(productId);
    }
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    return !exists;
};
