import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                    {/* Brand Info */}
                    <div>
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            LuxeMarket
                        </h3>
                        <p className="text-gray-400 mb-6">
                            Your premium destination for quality products from trusted vendors worldwide. Experience the future of online shopping.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Twitter size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">Shop All</Link></li>
                            <li><Link href="/vendors" className="text-gray-400 hover:text-white transition-colors">Vendors</Link></li>
                            <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                            <li><Link href="/vendor/apply" className="text-blue-400 hover:text-blue-300 transition-colors">Sell on LuxeMarket</Link></li>
                        </ul>
                    </div>

                    {/* Customer Service */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Customer Service</h4>
                        <ul className="space-y-3">
                            <li><Link href="/profile" className="text-gray-400 hover:text-white transition-colors">My Account</Link></li>
                            <li><Link href="/orders" className="text-gray-400 hover:text-white transition-colors">Order History</Link></li>
                            <li><Link href="/faq" className="text-gray-400 hover:text-white transition-colors">FAQs</Link></li>
                            <li><Link href="/returns" className="text-gray-400 hover:text-white transition-colors">Returns & Exchanges</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start">
                                <MapPin size={20} className="mr-3 text-blue-500 shrink-0" />
                                <span className="text-gray-400">123 Commerce Blvd, Suite 100<br />New York, NY 10001</span>
                            </li>
                            <li className="flex items-center">
                                <Phone size={20} className="mr-3 text-blue-500 shrink-0" />
                                <span className="text-gray-400">+1 (800) 123-4567</span>
                            </li>
                            <li className="flex items-center">
                                <Mail size={20} className="mr-3 text-blue-500 shrink-0" />
                                <span className="text-gray-400">support@luxemarket.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        © {new Date().getFullYear()} LuxeMarket. All rights reserved.
                    </p>
                    <div className="flex space-x-6 text-sm text-gray-500">
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
