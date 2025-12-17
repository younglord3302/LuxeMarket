'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { loadOrders } from '@/utils/localStorage';
import { Order } from '@/utils/mockData';
import { Package, ChevronRight, Truck } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
    const { user } = useAuth();
    const router = useRouter();
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
        } else {
            const userOrders = loadOrders(user.id);
            setOrders(userOrders);
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <h1 className="text-3xl font-bold mb-8">Order History</h1>

            {orders.length === 0 ? (
                <div className="text-center py-20 bg-gray-50 rounded-2xl">
                    <div className="w-16 h-16 bg-gray-200 text-gray-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Package size={32} />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900">No orders yet</h3>
                    <p className="text-gray-500 mt-2 mb-6">You haven't placed any orders yet.</p>
                    <Link href="/products" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                            <div className="bg-gray-50 p-4 flex flex-col sm:flex-row justify-between text-sm text-gray-600">
                                <div className="flex space-x-8">
                                    <div>
                                        <span className="block text-gray-500">Order Placed</span>
                                        <span className="font-medium text-gray-900">{new Date(order.date).toLocaleDateString()}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500">Total</span>
                                        <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
                                    </div>
                                    <div>
                                        <span className="block text-gray-500">Order #</span>
                                        <span className="font-medium text-gray-900">{order.id}</span>
                                    </div>
                                </div>
                                <div className="mt-4 sm:mt-0">
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="space-y-4">
                                    {order.items.map((item, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <img src={item.product.images[0]} alt={item.product.name} className="w-16 h-16 object-cover rounded-md bg-gray-100" />
                                            <div className="ml-4 flex-1">
                                                <Link href={`/products/${item.productId}`} className="font-medium text-gray-900 hover:text-blue-600">
                                                    {item.product.name}
                                                </Link>
                                                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                            </div>
                                            <Link
                                                href={`/products/${item.productId}`}
                                                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                                            >
                                                Buy Again
                                            </Link>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
