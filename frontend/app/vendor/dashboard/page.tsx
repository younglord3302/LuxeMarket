'use client';

import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { BarChart, Package, ShoppingBag, DollarSign, Users, Plus, TrendingUp } from 'lucide-react';

export default function VendorDashboard() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user || user.role !== 'vendor') {
            router.push('/login');
        }
    }, [user, router]);

    if (!user || user.role !== 'vendor') return null;

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Vendor Dashboard</h1>
                <Link
                    href="/vendor/products/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Product
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                            <DollarSign size={24} />
                        </div>
                        <span className="text-green-600 text-sm font-medium flex items-center">
                            <TrendingUp size={16} className="mr-1" /> +12%
                        </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">$12,450</h3>
                    <p className="text-sm text-gray-500">Total Revenue</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
                            <ShoppingBag size={24} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">45</h3>
                    <p className="text-sm text-gray-500">New Orders</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-purple-100 text-purple-600 rounded-lg">
                            <Package size={24} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">128</h3>
                    <p className="text-sm text-gray-500">Total Products</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                            <Users size={24} />
                        </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">4.8</h3>
                    <p className="text-sm text-gray-500">Average Rating</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Orders */}
                <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                        <h2 className="text-lg font-bold">Recent Orders</h2>
                        <Link href="/vendor/orders" className="text-blue-600 text-sm font-medium hover:underline">View All</Link>
                    </div>
                    <div className="divide-y divide-gray-100">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500">
                                        O#{i}
                                    </div>
                                    <div>
                                        <p className="font-medium text-gray-900">Order #{1000 + i}</p>
                                        <p className="text-sm text-gray-500">2 items • $124.00</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full font-medium">Processing</span>
                                    <span className="text-sm text-gray-500">2 mins ago</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                        <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
                        <div className="space-y-3">
                            <Link href="/vendor/products" className="block w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                Manage Inventory
                            </Link>
                            <Link href="/vendor/orders" className="block w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                Process Orders
                            </Link>
                            <Link href="#" className="block w-full p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
