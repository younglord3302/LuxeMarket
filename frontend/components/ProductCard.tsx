'use client';

import Link from 'next/link';
import { Product } from '@/utils/mockData';
import { useCart } from '@/contexts/CartContext';
import { Star, ShoppingCart, Eye } from 'lucide-react';
import { toast } from 'sonner';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        addToCart(product, 1);
        toast.success(`Added ${product.name} to cart`);
    };

    return (
        <div className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
            <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.isNew && (
                    <span className="absolute top-3 left-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        NEW
                    </span>
                )}
                {product.originalPrice && (
                    <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                        SALE
                    </span>
                )}

                {/* Quick Actions Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    <button
                        onClick={handleAddToCart}
                        className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors transform hover:scale-110"
                        title="Add to Cart"
                    >
                        <ShoppingCart size={20} />
                    </button>
                    <Link
                        href={`/products/${product.id}`}
                        className="bg-white text-gray-900 p-3 rounded-full hover:bg-blue-600 hover:text-white transition-colors transform hover:scale-110"
                        title="View Details"
                    >
                        <Eye size={20} />
                    </Link>
                </div>
            </div>

            <div className="p-4">
                <div className="flex items-center space-x-1 mb-2">
                    <Star size={14} className="text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviewsCount})</span>
                </div>

                <Link href={`/products/${product.id}`}>
                    <h3 className="text-gray-800 font-medium hover:text-blue-600 transition-colors mb-1 truncate">
                        {product.name}
                    </h3>
                </Link>

                <p className="text-sm text-gray-500 mb-3 truncate hover:text-clip">{product.vendorName}</p>
                {/* Vendor link could be added here if needed, keeping simple for card */}

                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-baseline space-x-2">
                            <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                            {product.originalPrice && (
                                <span className="text-sm text-gray-400 line-through">${product.originalPrice.toFixed(2)}</span>
                            )}
                        </div>
                        {product.originalPrice && (
                            <span className="text-xs text-green-600 font-medium">
                                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% Satving
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
