import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 text-white font-bold text-xl">
                                M
                            </div>
                            <span className="text-xl font-bold">MarketPlace</span>
                        </Link>
                        <p className="text-gray-400 mb-6">
                            The premier destination for quality products from trusted vendors. Shop electronics, fashion, home goods, and more.
                        </p>
                        <div className="flex gap-4">
                            {['twitter', 'facebook', 'instagram', 'linkedin'].map((social) => (
                                <a
                                    key={social}
                                    href={`#${social}`}
                                    className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                                    aria-label={social}
                                >
                                    <span className="capitalize">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link href="/vendors" className="text-gray-400 hover:text-white transition-colors">
                                    Browse Vendors
                                </Link>
                            </li>
                            <li>
                                <Link href="/cart" className="text-gray-400 hover:text-white transition-colors">
                                    Shopping Cart
                                </Link>
                            </li>
                            <li>
                                <Link href="/track-order" className="text-gray-400 hover:text-white transition-colors">
                                    Track Order
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">Customer Service</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/help" className="text-gray-400 hover:text-white transition-colors">
                                    Help Center
                                </Link>
                            </li>
                            <li>
                                <Link href="/returns" className="text-gray-400 hover:text-white transition-colors">
                                    Returns & Refunds
                                </Link>
                            </li>
                            <li>
                                <Link href="/shipping" className="text-gray-400 hover:text-white transition-colors">
                                    Shipping Info
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                                    Contact Us
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Vendors */}
                    <div>
                        <h3 className="text-lg font-semibold mb-6">For Vendors</h3>
                        <ul className="space-y-4">
                            <li>
                                <Link href="/vendor/apply" className="text-gray-400 hover:text-white transition-colors">
                                    Become a Vendor
                                </Link>
                            </li>
                            <li>
                                <Link href="/vendor/login" className="text-gray-400 hover:text-white transition-colors">
                                    Vendor Login
                                </Link>
                            </li>
                            <li>
                                <Link href="/vendor/dashboard" className="text-gray-400 hover:text-white transition-colors">
                                    Vendor Dashboard
                                </Link>
                            </li>
                            <li>
                                <Link href="/vendor/guide" className="text-gray-400 hover:text-white transition-colors">
                                    Success Guide
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-top border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} MarketPlace. All rights reserved.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
