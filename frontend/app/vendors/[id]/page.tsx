'use client';

import { use } from 'react';
import { MOCK_VENDORS, MOCK_PRODUCTS } from '@/utils/mockData';
import ProductCard from '@/components/ProductCard';
import { Star, MapPin, Calendar, CheckCircle } from 'lucide-react';

export default function VendorStorePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    const vendor = MOCK_VENDORS.find(v => v.id === id);
    const vendorProducts = MOCK_PRODUCTS.filter(p => p.vendorId === id);

    if (!vendor) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold">Vendor not found</h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 min-h-screen pb-20">
            {/* Vendor Header */}
            <div className="bg-white border-b border-gray-100">
                <div className="h-64 md:h-80 w-full relative">
                    <img src={vendor.banner} alt={vendor.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                <div className="container mx-auto px-4">
                    <div className="relative -mt-20 mb-8 flex flex-col md:flex-row items-end md:items-end gap-6">
                        <img src={vendor.logo} alt={vendor.name} className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg" />

                        <div className="flex-1 pb-4 text-white md:text-gray-900 mb-4 md:mb-0">
                            <h1 className="text-3xl md:text-4xl font-bold mb-2 flex items-center">
                                {vendor.name} <CheckCircle size={24} className="ml-2 text-blue-500 fill-white" />
                            </h1>
                            <p className="text-lg opacity-90 md:text-gray-600 md:opacity-100 max-w-2xl">{vendor.description}</p>
                        </div>

                        <div className="flex gap-4 pb-6 w-full md:w-auto">
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 md:flex-none text-center">
                                <div className="text-2xl font-bold text-gray-900">{vendor.rating}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Rating</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 md:flex-none text-center">
                                <div className="text-2xl font-bold text-gray-900">{vendor.productsCount}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Products</div>
                            </div>
                            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex-1 md:flex-none text-center">
                                <div className="text-2xl font-bold text-gray-900">{new Date(vendor.joinedDate).getFullYear()}</div>
                                <div className="text-xs text-gray-500 uppercase tracking-wide">Joined</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Vendor Products */}
            <div className="container mx-auto px-4 py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">All Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {vendorProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
                {vendorProducts.length === 0 && (
                    <p className="text-gray-500 text-center py-12">No products available yet.</p>
                )}
            </div>
        </div>
    );
}
