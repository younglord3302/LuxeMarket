'use client';

import { useAuth } from '@/contexts/AuthContext';
import { Eye } from 'lucide-react';

export default function VendorOrdersPage() {
    const { user } = useAuth();

    const myOrders = [
        { id: '1001', customer: 'John Doe', total: 129.99, date: '2023-11-20', status: 'pending' },
        { id: '1002', customer: 'Alice Smith', total: 45.00, date: '2023-11-19', status: 'shipped' },
        { id: '1003', customer: 'Bob Jones', total: 89.50, date: '2023-11-18', status: 'delivered' },
    ];

    if (!user || user.role !== 'vendor') return null;

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-gray-900">Order ID</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Customer</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Date</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Total</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Status</th>
                            <th className="px-6 py-4 font-semibold text-gray-900">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {myOrders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 font-medium text-gray-900">#{order.id}</td>
                                <td className="px-6 py-4 text-gray-600">{order.customer}</td>
                                <td className="px-6 py-4 text-gray-600">{order.date}</td>
                                <td className="px-6 py-4 text-gray-900">${order.total.toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="text-gray-400 hover:text-blue-600">
                                        <Eye size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
