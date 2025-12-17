'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function VendorApplyPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setLoading(false);
        toast.success('Application submitted successfully! We will review it shortly.');
        router.push('/');
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24 max-w-2xl">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-bold mb-4">Become a Vendor</h1>
                <p className="text-gray-600">Join our marketplace and reach millions of customers.</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                            <input required className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID / VAT</label>
                            <input required className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select className="w-full px-4 py-2 rounded-lg border border-gray-200 bg-white">
                            <option>Electronics</option>
                            <option>Fashion</option>
                            <option>Home & Garden</option>
                            <option>Beauty</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Business Description</label>
                        <textarea required rows={4} className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                            <input required className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Email</label>
                            <input required type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200" />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
                    >
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </form>
            </div>
        </div>
    );
}
