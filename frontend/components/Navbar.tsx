'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
// We'll import these from contexts that we will update/create
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Search, ShoppingCart, Menu, X, User, Heart, LogOut, Package } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const router = useRouter();
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-white/80 backdrop-blur-md py-4'
            }`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        LuxeMarket
                    </Link>

                    {/* Desktop Search */}
                    <div className="hidden md:block flex-1 max-w-xl mx-8">
                        <form onSubmit={handleSearch} className="relative">
                            <input
                                type="text"
                                placeholder="Search for products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-gray-50"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600">
                                <Search size={20} />
                            </button>
                        </form>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/products" className="text-gray-600 hover:text-blue-600 font-medium">
                            Shop
                        </Link>
                        <Link href="/vendors" className="text-gray-600 hover:text-blue-600 font-medium">
                            Vendors
                        </Link>

                        <div className="flex items-center space-x-4 ml-4 pl-4 border-l border-gray-200">
                            {user ? (
                                <div className="group relative">
                                    <button className="flex items-center space-x-2 text-gray-700 hover:text-blue-600">
                                        {user.avatar ? (
                                            <img src={user.avatar} alt={user.name} className="w-8 h-8 rounded-full" />
                                        ) : (
                                            <User size={24} />
                                        )}
                                        <span className="font-medium max-w-[100px] truncate">{user.name}</span>
                                    </button>
                                    {/* Dropdown Menu */}
                                    <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right">
                                        <div className="py-2">
                                            <Link href="/profile" className="flex items-center px-4 py-2 hover:bg-gray-50 text-gray-700">
                                                <User size={16} className="mr-2" /> Profile
                                            </Link>
                                            <Link href="/orders" className="flex items-center px-4 py-2 hover:bg-gray-50 text-gray-700">
                                                <Package size={16} className="mr-2" /> Orders
                                            </Link>
                                            {user.role === 'vendor' && (
                                                <Link href="/vendor/dashboard" className="flex items-center px-4 py-2 hover:bg-gray-50 text-blue-600">
                                                    <Package size={16} className="mr-2" /> Vendor Dashboard
                                                </Link>
                                            )}
                                            <button onClick={logout} className="w-full flex items-center px-4 py-2 hover:bg-gray-50 text-red-600">
                                                <LogOut size={16} className="mr-2" /> Logout
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Login
                                </Link>
                            )}

                            <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
                                <ShoppingCart size={24} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 mt-2">
                        <form onSubmit={handleSearch} className="mb-4 relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-gray-50"
                            />
                            <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <Search size={20} />
                            </button>
                        </form>

                        <div className="flex flex-col space-y-4">
                            <Link href="/products" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>
                                Shop
                            </Link>
                            <Link href="/vendors" className="text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>
                                Vendors
                            </Link>
                            <Link href="/cart" className="flex items-center justify-between text-gray-700 font-medium" onClick={() => setIsMenuOpen(false)}>
                                <span>Cart</span>
                                <div className="flex items-center">
                                    <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full">{cartCount}</span>
                                </div>
                            </Link>

                            {user ? (
                                <>
                                    <div className="border-t border-gray-100 pt-4">
                                        <p className="text-sm text-gray-500 mb-2">Signed in as {user.name}</p>
                                        <Link href="/profile" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                                        <Link href="/orders" className="block py-2 text-gray-700" onClick={() => setIsMenuOpen(false)}>Orders</Link>
                                        {user.role === 'vendor' && (
                                            <Link href="/vendor/dashboard" className="block py-2 text-blue-600" onClick={() => setIsMenuOpen(false)}>Vendor Dashboard</Link>
                                        )}
                                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="block w-full text-left py-2 text-red-600">Logout</button>
                                    </div>
                                </>
                            ) : (
                                <Link href="/login" className="text-blue-600 font-medium" onClick={() => setIsMenuOpen(false)}>
                                    Login
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
