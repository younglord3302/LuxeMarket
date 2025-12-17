'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

    if (cart.length === 0) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
                <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Link href="/products" className="bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
                    Start Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart ({cart.length} items)</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                {/* Cart Items */}
                <div className="flex-1 space-y-6">
                    {cart.map((item) => (
                        <div key={item.productId} className="flex items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                            <div className="w-24 h-24 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                                <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                            </div>

                            <div className="flex-1 ml-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-gray-900 mb-1">
                                            <Link href={`/products/${item.productId}`} className="hover:text-blue-600 transition-colors">
                                                {item.product.name}
                                            </Link>
                                        </h3>
                                        <p className="text-sm text-gray-500 mb-2">Sold by: {item.product.vendorName}</p>
                                        <p className="font-bold text-gray-900">${item.product.price.toFixed(2)}</p>
                                    </div>
                                    <button
                                        onClick={() => removeFromCart(item.productId)}
                                        className="text-gray-400 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={20} />
                                    </button>
                                </div>

                                <div className="flex items-center mt-4">
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={() => updateQuantity(item.productId, Math.max(1, item.quantity - 1))}
                                            className="p-1 px-3 hover:bg-gray-50 text-gray-600"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold text-gray-900">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.productId, Math.min(item.product.stock, item.quantity + 1))}
                                            className="p-1 px-3 hover:bg-gray-50 text-gray-600"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-96 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
                    <h2 className="text-xl font-bold mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                        <div className="flex justify-between text-gray-600">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Shipping</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-gray-600">
                            <span>Tax (Estimated)</span>
                            <span>${(cartTotal * 0.08).toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-100 pt-4 flex justify-between text-lg font-bold text-gray-900">
                            <span>Total</span>
                            <span>${(cartTotal * 1.08).toFixed(2)}</span>
                        </div>
                    </div>

                    <Link href="/checkout" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl font-bold transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25">
                        Proceed to Checkout
                    </Link>

                    <Link href="/products" className="block text-center mt-4 text-gray-500 hover:text-gray-900 text-sm font-medium">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
