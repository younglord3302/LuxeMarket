'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/mockData';
import { addToCart } from '@/lib/localStorage';
import { useState } from 'react';

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const [isAdding, setIsAdding] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation to product page
        e.stopPropagation();

        setIsAdding(true);
        addToCart(product);

        // Dispatch event to update navbar cart count
        window.dispatchEvent(new Event('cartUpdated'));

        setTimeout(() => {
            setIsAdding(false);
        }, 1000);
    };

    const discountPercentage = product.originalPrice
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
        : 0;

    return (
        <Link href={`/products/${product.id}`} className="card group block h-full overflow-hidden">
            {/* Image Container */}
            <div className="product-image-wrapper relative aspect-square w-full bg-gray-100">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="product-image object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-2">
                    {product.originalPrice && (
                        <span className="badge bg-red-500 text-white">
                            -{discountPercentage}%
                        </span>
                    )}
                    {product.trending && (
                        <span className="badge bg-purple-500 text-white">
                            Trending
                        </span>
                    )}
                    {product.featured && (
                        <span className="badge bg-blue-500 text-white">
                            Featured
                        </span>
                    )}
                </div>

                {/* Quick Actions (visible on hover) */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 px-4">
                    <button
                        onClick={handleAddToCart}
                        disabled={isAdding}
                        className={`w-full py-2 px-4 rounded-lg font-medium shadow-lg transition-colors ${isAdding
                                ? 'bg-green-500 text-white'
                                : 'bg-white text-gray-900 hover:bg-blue-600 hover:text-white'
                            }`}
                    >
                        {isAdding ? 'Added!' : 'Add to Cart'}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="mb-2 flex items-center justify-between text-xs text-gray-500">
                    <span>{product.category}</span>
                    <span className="flex items-center gap-1">
                        <svg className="h-3 w-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        {product.rating} ({product.reviewCount})
                    </span>
                </div>

                <h3 className="mb-2 text-base font-semibold text-gray-900 line-clamp-2 min-h-[3rem]">
                    {product.name}
                </h3>

                <div className="mb-3 text-sm text-gray-500">
                    Sold by {product.vendorName}
                </div>

                <div className="flex items-end gap-2">
                    <span className="price-tag text-xl">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                        <span className="price-original text-sm">${product.originalPrice.toFixed(2)}</span>
                    )}
                </div>
            </div>
        </Link>
    );
}
