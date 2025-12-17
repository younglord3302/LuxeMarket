'use client';

import { useParams } from 'next/navigation';
import { useState, use } from 'react';
import { MOCK_PRODUCTS, MOCK_REVIEWS, MOCK_VENDORS } from '@/utils/mockData';
import { useCart } from '@/contexts/CartContext';
import ProductCard from '@/components/ProductCard';
import ReviewCard from '@/components/ReviewCard';
import { Star, ShoppingCart, Truck, ShieldCheck, Heart, Share2, Minus, Plus } from 'lucide-react';
import { toast } from 'sonner';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using use() for Next.js 15+ or await if it was async component
    // Since this is 'use client', we handle the promise differently or expects params to be passed
    // In Next.js 15, page params are a Promise.

    const { id } = use(params);

    const product = MOCK_PRODUCTS.find(p => p.id === id);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    if (!product) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold">Product not found</h1>
            </div>
        );
    }

    const vendor = MOCK_VENDORS.find(v => v.id === product.vendorId);
    const reviews = MOCK_REVIEWS.filter(r => r.productId === product.id);
    const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

    const handleAddToCart = () => {
        addToCart(product, quantity);
        toast.success(`Added ${quantity} ${product.name} to cart`);
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            {/* Product Top */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                        <img
                            src={product.images[activeImage]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex space-x-4 overflow-x-auto pb-2">
                            {product.images.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveImage(idx)}
                                    className={`w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-blue-600' : 'border-transparent'
                                        }`}
                                >
                                    <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
                    <div className="flex items-center space-x-4 mb-6">
                        <div className="flex items-center text-yellow-500">
                            <Star className="fill-current" size={18} />
                            <span className="font-bold ml-1 text-gray-900">{product.rating}</span>
                        </div>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-500">{product.reviewsCount} Reviews</span>
                        <span className="text-gray-300">|</span>
                        <span className="text-gray-900 font-medium">In Stock: {product.stock}</span>
                    </div>

                    <div className="flex items-baseline mb-8">
                        <span className="text-4xl font-bold text-gray-900 mr-4">${product.price}</span>
                        {product.originalPrice && (
                            <span className="text-xl text-gray-400 line-through">${product.originalPrice}</span>
                        )}
                    </div>

                    <p className="text-gray-600 mb-8 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="border-t border-b border-gray-100 py-6 mb-8 mt-6">
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="p-3 hover:bg-gray-50 text-gray-600"
                                >
                                    <Minus size={16} />
                                </button>
                                <span className="w-12 text-center font-bold text-gray-900">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                    className="p-3 hover:bg-gray-50 text-gray-600"
                                >
                                    <Plus size={16} />
                                </button>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-lg font-bold flex items-center justify-center space-x-2 transition-transform active:scale-95"
                            >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </button>

                            <button className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-600 transition-colors">
                                <Heart size={20} />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center space-x-3 text-gray-600">
                            <Truck size={20} className="text-blue-500" />
                            <span>Free delivery on orders over $50</span>
                        </div>
                        <div className="flex items-center space-x-3 text-gray-600">
                            <ShieldCheck size={20} className="text-blue-500" />
                            <span>2 Year Commercial Warranty</span>
                        </div>
                    </div>

                    {vendor && (
                        <div className="mt-8 p-4 bg-gray-50 rounded-xl flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                                <img src={vendor.logo} alt={vendor.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <h4 className="font-bold text-gray-900">{vendor.name}</h4>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <Star size={12} className="text-yellow-500 fill-yellow-500 mr-1" />
                                        {vendor.rating} Seller Rating
                                    </div>
                                </div>
                            </div>
                            <a href={`/vendors/${vendor.id}`} className="text-blue-600 font-medium hover:underline text-sm">
                                View Store
                            </a>
                        </div>
                    )}
                </div>
            </div>

            {/* Reviews Section */}
            <div className="mb-16">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Customer Reviews ({reviews.length})</h2>
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500 italic">No reviews yet for this product.</p>
                )}
            </div>

            {/* Related Products */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Products</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {relatedProducts.map(related => (
                        <ProductCard key={related.id} product={related} />
                    ))}
                </div>
            </div>
        </div>
    );
}
