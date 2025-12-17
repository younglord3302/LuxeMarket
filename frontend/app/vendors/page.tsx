'use client';

import Link from 'next/link';
import { MOCK_VENDORS } from '@/utils/mockData';
import { Star, MapPin } from 'lucide-react';

export default function VendorsPage() {
    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl font-bold mb-4">Our Trusted Vendors</h1>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Discover unique products from independent sellers and premium brands.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {MOCK_VENDORS.map((vendor) => (
                    <Link key={vendor.id} href={`/vendors/${vendor.id}`} className="group block bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                        <div className="h-40 bg-gray-200 relative">
                            <img src={vendor.banner} alt={vendor.name} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        </div>

                        <div className="px-6 relative">
                            <div className="-mt-12 mb-4">
                                <img src={vendor.logo} alt={vendor.name} className="w-24 h-24 rounded-full border-4 border-white shadow-md" />
                            </div>

                            <div className="pb-8">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{vendor.name}</h3>
                                    <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
                                        <Star size={14} className="text-yellow-500 fill-yellow-500 mr-1" />
                                        <span className="font-bold text-sm text-yellow-700">{vendor.rating}</span>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>

                                <div className="flex items-center text-sm text-gray-400">
                                    <span className="mr-4"><strong>{vendor.productsCount}</strong> Products</span>
                                    <span>Joined {new Date(vendor.joinedDate).getFullYear()}</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
