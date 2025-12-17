'use client';

import { useAuth } from '@/contexts/AuthContext';
import { MOCK_PRODUCTS } from '@/utils/mockData';
import { Edit, Trash2, Plus } from 'lucide-react';
import Link from 'next/link';

export default function VendorProductsPage() {
    const { user } = useAuth();

    // In a real app, we would fetch products for this vendor.
    // Here we filter mock products.
    const myProducts = MOCK_PRODUCTS.slice(0, 5); // Simulating vendor products

    if (!user || user.role !== 'vendor') return null;

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">My Products</h1>
                <Link
                    href="/vendor/products/new"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center"
                >
                    <Plus size={20} className="mr-2" /> Add Product
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-900">Product</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Price</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Stock</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {myProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.category}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-gray-900">${product.price.toFixed(2)}</td>
                                <td className="px-6 py-4 text-gray-900">{product.stock}</td>
                                <td className="px-6 py-4">
                                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Active</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex space-x-3">
                                        <button className="text-blue-600 hover:text-blue-700">
                                            <Edit size={18} />
                                        </button>
                                        <button className="text-red-600 hover:text-red-700">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
