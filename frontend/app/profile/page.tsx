'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { User, Mail, MapPin } from 'lucide-react';

export default function ProfilePage() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user, router]);

    if (!user) {
        return null;
    }

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <h1 className="text-3xl font-bold mb-8">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Profile Card */}
                <div className="col-span-1 bg-white p-8 rounded-2xl border border-gray-100 shadow-sm text-center">
                    <div className="w-32 h-32 mx-auto bg-gray-100 rounded-full mb-6 overflow-hidden">
                        {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <User size={48} />
                            </div>
                        )}
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
                    <p className="text-gray-500 mb-6">{user.role.charAt(0).toUpperCase() + user.role.slice(1)} Account</p>
                    <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Edit Profile
                    </button>
                </div>

                {/* Details */}
                <div className="col-span-2 space-y-8">
                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold mb-6">Personal Information</h3>
                        <div className="space-y-4">
                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <User size={20} className="text-gray-400 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">Full Name</p>
                                    <p className="font-medium text-gray-900">{user.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                                <Mail size={20} className="text-gray-400 mr-4" />
                                <div>
                                    <p className="text-sm text-gray-500">Email Address</p>
                                    <p className="font-medium text-gray-900">{user.email}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold">Addresses</h3>
                            <button className="text-sm text-blue-600 hover:underline">Add New</button>
                        </div>
                        {user.addresses && user.addresses.length > 0 ? (
                            <div className="space-y-4">
                                {user.addresses.map((addr) => (
                                    <div key={addr.id} className="flex items-start p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <MapPin size={20} className="text-gray-400 mr-4 mt-1" />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <p className="font-medium text-gray-900">Default Address</p>
                                                {addr.isDefault && (
                                                    <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">Default</span>
                                                )}
                                            </div>
                                            <p className="text-gray-600 mt-1">
                                                {addr.street}<br />
                                                {addr.city}, {addr.state} {addr.zipCode}<br />
                                                {addr.country}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No addresses saved.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
