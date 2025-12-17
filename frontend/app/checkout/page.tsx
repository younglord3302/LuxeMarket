'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { saveOrder } from '@/utils/localStorage';
import { Order } from '@/utils/mockData';
import { CheckCircle, Truck, CreditCard, Lock } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);

    const [formData, setFormData] = useState({
        firstName: user?.name.split(' ')[0] || '',
        lastName: user?.name.split(' ')[1] || '',
        email: user?.email || '',
        address: user?.addresses?.[0]?.street || '',
        city: user?.addresses?.[0]?.city || '',
        state: user?.addresses?.[0]?.state || '',
        zip: user?.addresses?.[0]?.zipCode || ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        const newOrder: Order = {
            id: `ord_${Math.random().toString(36).substr(2, 9)}`,
            userId: user?.id || 'guest',
            items: cart,
            total: cartTotal * 1.08,
            status: 'pending',
            date: new Date().toISOString(),
            shippingAddress: {
                id: 'addr_new',
                street: formData.address,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zip,
                country: 'USA',
                isDefault: false
            }
        };

        saveOrder(newOrder);
        clearCart();
        setIsProcessing(false);
        setOrderComplete(true);
        toast.success('Order placed successfully!');
    };

    if (cart.length === 0 && !orderComplete) {
        return (
            <div className="container mx-auto px-4 py-24 text-center">
                <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
                <Link href="/products" className="text-blue-600 hover:underline">
                    Go back to shop
                </Link>
            </div>
        );
    }

    if (orderComplete) {
        return (
            <div className="container mx-auto px-4 py-24 text-center max-w-lg">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} />
                </div>
                <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
                <p className="text-gray-600 mb-8">
                    Your order has been placed successfully. You will receive an email confirmation shortly.
                </p>
                <div className="space-y-4">
                    <Link href="/orders" className="block w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700">
                        View Order Status
                    </Link>
                    <Link href="/" className="block w-full bg-gray-100 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-200">
                        Continue Shopping
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <h1 className="text-3xl font-bold mb-8">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-12">
                <div className="flex-1">
                    <form onSubmit={handleSubmit} id="checkout-form" className="space-y-8">
                        {/* Shipping Info */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center">
                                <Truck className="mr-3 text-blue-600" /> Shipping Information
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                    <input required name="firstName" value={formData.firstName} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                    <input required name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input required type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
                                    <input required name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input required name="city" value={formData.city} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input required name="state" value={formData.state} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
                                    <input required name="zip" value={formData.zip} onChange={handleInputChange} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                </div>
                            </div>
                        </div>

                        {/* Payment Info (Simulated) */}
                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                            <h2 className="text-xl font-bold mb-6 flex items-center">
                                <CreditCard className="mr-3 text-blue-600" /> Payment Details
                            </h2>
                            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 text-sm text-gray-600 mb-4 flex items-start">
                                <Lock size={16} className="mr-2 mt-0.5 shrink-0" />
                                This is a secure simulation. No real payment will be processed. You can use any mock card details.
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                    <input placeholder="0000 0000 0000 0000" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                                        <input placeholder="MM/YY" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                                        <input placeholder="123" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Order Summary Sidebar */}
                <div className="w-full lg:w-96">
                    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                        <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                        <div className="max-h-60 overflow-y-auto mb-6 pr-2">
                            {cart.map(item => (
                                <div key={item.productId} className="flex justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden mr-3">
                                            <img src={item.product.images[0]} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium line-clamp-1 w-32">{item.product.name}</p>
                                            <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                    </div>
                                    <span className="font-medium text-sm">${(item.product.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-3 mb-6 border-t border-gray-100 pt-4">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span className="text-green-600">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (8%)</span>
                                <span>${(cartTotal * 0.08).toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-100 pt-3">
                                <span>Total</span>
                                <span>${(cartTotal * 1.08).toFixed(2)}</span>
                            </div>
                        </div>

                        <button
                            type="submit"
                            form="checkout-form"
                            disabled={isProcessing}
                            className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-xl font-bold transition-all disabled:opacity-50"
                        >
                            {isProcessing ? 'Processing...' : 'Place Order'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
