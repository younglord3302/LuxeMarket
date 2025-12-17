'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCartItemCount, getCurrentUser, logout } from '@/lib/localStorage';
import { getCategories } from '@/lib/mockData';

export default function Navbar() {
    const [cartCount, setCartCount] = useState(0);
    const [user, setUser] = useState<any>(null);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const categories = getCategories();

    useEffect(() => {
        // Update cart count and user on mount and when storage changes
        const updateState = () => {
            setCartCount(getCartItemCount());
            setUser(getCurrentUser());
        };

        updateState();

        // Listen for storage changes
        window.addEventListener('storage', updateState);
        // Custom event for cart updates
        window.addEventListener('cartUpdated', updateState);

        return () => {
            window.removeEventListener('storage', updateState);
            window.removeEventListener('cartUpdated', updateState);
        };
    }, []);

    const handleLogout = () => {
        logout();
        setUser(null);
        window.location.href = '/';
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    return (
        <nav className="sticky top-0 z-50 bg-white shadow-md">
            {/* Top Bar */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-2 text-white">
                <div className="container-custom flex items-center justify-between text-sm">
                    <p>🎉 Free shipping on orders over $50!</p>
                    <div className="flex gap-4">
                        {user?.role === 'vendor' && (
                            <Link href="/vendor/dashboard" className="hover:underline">
                                Vendor Dashboard
                            </Link>
                        )}
                        {user?.role === 'customer' && !user?.vendorId && (
                            <Link href="/vendor/apply" className="hover:underline">
                                Become a Vendor
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <div className="container-custom py-4">
                <div className="flex items-center justify-between gap-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-xl">
                            M
                        </div>
                        <span className="hidden sm:block text-xl font-bold gradient-text">
                            MarketPlace
                        </span>
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
                        <div className="relative w-full">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full rounded-l-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <button
                                type="submit"
                                className="absolute right-0 top-0 h-full rounded-r-lg bg-blue-600 px-6 text-white hover:bg-blue-700 transition-colors"
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </button>
                        </div>
                    </form>

                    {/* Right Side Icons */}
                    <div className="flex items-center gap-4">
                        {/* Cart */}
                        <Link href="/cart" className="relative group">
                            <svg className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            {cartCount > 0 && (
                                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User Menu */}
                        {user ? (
                            <div className="relative group">
                                <button className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100 transition-colors">
                                    <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                                        {user.name.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="hidden lg:block text-sm font-medium">{user.name}</span>
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {/* Dropdown */}
                                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                                    <Link href="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100 rounded-t-lg">
                                        Profile
                                    </Link>
                                    <Link href="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                        My Orders
                                    </Link>
                                    {user.role === 'vendor' && (
                                        <Link href="/vendor/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100">
                                            Vendor Dashboard
                                        </Link>
                                    )}
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 rounded-b-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <Link href="/login" className="btn btn-outline text-sm px-4 py-2">
                                    Login
                                </Link>
                                <Link href="/register" className="btn btn-primary text-sm px-4 py-2">
                                    Sign Up
                                </Link>
                            </div>
                        )}

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="hidden md:flex items-center gap-6 mt-4 pt-4 border-t border-gray-200">
                    <Link href="/products" className="text-sm font-medium hover:text-blue-600 transition-colors">
                        All Products
                    </Link>
                    {categories.map((category) => (
                        <Link
                            key={category}
                            href={`/products?category=${encodeURIComponent(category)}`}
                            className="text-sm hover:text-blue-600 transition-colors"
                        >
                            {category}
                        </Link>
                    ))}
                    <Link href="/vendors" className="text-sm hover:text-blue-600 transition-colors">
                        Vendors
                    </Link>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 bg-white animate-slide-in">
                    <div className="container-custom py-4 space-y-2">
                        {/* Mobile Search */}
                        <form onSubmit={handleSearch} className="mb-4">
                            <input
                                type="text"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input"
                            />
                        </form>

                        <Link href="/products" className="block py-2 text-sm font-medium hover:text-blue-600">
                            All Products
                        </Link>
                        {categories.map((category) => (
                            <Link
                                key={category}
                                href={`/products?category=${encodeURIComponent(category)}`}
                                className="block py-2 text-sm hover:text-blue-600"
                            >
                                {category}
                            </Link>
                        ))}
                        <Link href="/vendors" className="block py-2 text-sm hover:text-blue-600">
                            Vendors
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
