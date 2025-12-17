import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { MOCK_PRODUCTS, MOCK_VENDORS } from '@/utils/mockData';
import { ArrowRight, TrendingUp, ShieldCheck, Truck } from 'lucide-react';

export default function Home() {
  const featuredProducts = MOCK_PRODUCTS.filter(p => p.isFeatured).slice(0, 4);
  const newArrivals = MOCK_PRODUCTS.filter(p => p.isNew).slice(0, 4);
  const topVendors = MOCK_VENDORS.slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10" />
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=2000"
          alt="Shopping"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Discover Luxury <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Without Limits
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Shop from thousands of premium brands and independent vendors.
              Experience the future of online shopping today.
            </p>
            <div className="flex space-x-4">
              <Link href="/products" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full font-bold transition-all transform hover:scale-105 flex items-center">
                Start Shopping <ArrowRight className="ml-2" />
              </Link>
              <Link href="/vendor/apply" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold transition-all">
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gray-50">
              <div className="p-3 bg-blue-100 text-blue-600 rounded-full">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Fast Shipping</h3>
                <p className="text-sm text-gray-500">Tracked delivery worldwide</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gray-50">
              <div className="p-3 bg-purple-100 text-purple-600 rounded-full">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Secure Payment</h3>
                <p className="text-sm text-gray-500">100% secure transactions</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-6 rounded-2xl bg-gray-50">
              <div className="p-3 bg-pink-100 text-pink-600 rounded-full">
                <TrendingUp size={24} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Quality Guarantee</h3>
                <p className="text-sm text-gray-500">Curated premium products</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Featured Collections</h2>
            <Link href="/products" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Vendors */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Top Rated Vendors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topVendors.map((vendor) => (
              <div key={vendor.id} className="bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="h-32 bg-gray-200 relative">
                  <img src={vendor.banner} alt={vendor.name} className="w-full h-full object-cover" />
                  <div className="absolute -bottom-8 left-6">
                    <img src={vendor.logo} alt={vendor.name} className="w-16 h-16 rounded-full border-4 border-white" />
                  </div>
                </div>
                <div className="pt-10 p-6">
                  <h3 className="font-bold text-lg mb-1">{vendor.name}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <span className="text-yellow-500 font-bold mr-1">★ {vendor.rating}</span>
                    <span>• {vendor.productsCount} Products</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{vendor.description}</p>
                  <Link href={`/vendors/${vendor.id}`} className="block w-full py-2 text-center border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Visit Store
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12">Fresh Arrivals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-[1px]" />
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-4">Ready to Start Selling?</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of vendors growing their business on LuxeMarket.
                Get access to millions of customers today.
              </p>
              <Link href="/vendor/apply" className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all">
                Become a Vendor
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
