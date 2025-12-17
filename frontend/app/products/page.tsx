'use client';

import { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import SearchFilters from '@/components/SearchFilters';
import { MOCK_PRODUCTS } from '@/utils/mockData';
import { SlidersHorizontal } from 'lucide-react';

function ProductListing() {
    const searchParams = useSearchParams();
    const initialSearch = searchParams.get('search') || '';

    const [selectedCategory, setSelectedCategory] = useState('');
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    const filteredProducts = useMemo(() => {
        return MOCK_PRODUCTS.filter(product => {
            // Search term
            if (initialSearch && !product.name.toLowerCase().includes(initialSearch.toLowerCase())) {
                return false;
            }
            // Category
            if (selectedCategory && product.category !== selectedCategory) {
                return false;
            }
            // Price
            if (product.price < priceRange[0] || product.price > priceRange[1]) {
                return false;
            }
            // Rating
            if (selectedRating && product.rating < selectedRating) {
                return false;
            }
            return true;
        }).sort((a, b) => {
            switch (sortBy) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'rating': return b.rating - a.rating;
                case 'newest': return (a.isNew === b.isNew) ? 0 : a.isNew ? -1 : 1;
                default: return 0;
            }
        });
    }, [initialSearch, selectedCategory, priceRange, selectedRating, sortBy]);

    const clearFilters = () => {
        setSelectedCategory('');
        setPriceRange([0, 1000]);
        setSelectedRating(null);
    };

    return (
        <div className="container mx-auto px-4 py-8 pt-24">
            <div className="flex flex-col md:flex-row justify-between items-baseline mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        {initialSearch ? `Results for "${initialSearch}"` : 'All Products'}
                    </h1>
                    <p className="text-gray-500">Showing {filteredProducts.length} results</p>
                </div>

                <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <button
                        className="md:hidden flex items-center px-4 py-2 border border-gray-200 rounded-lg"
                        onClick={() => setShowFilters(!showFilters)}
                    >
                        <SlidersHorizontal size={20} className="mr-2" /> Filters
                    </button>

                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="px-4 py-2 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating">Best Rating</option>
                        <option value="newest">Newest Arrivals</option>
                    </select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-8">
                {/* Sidebar Filters */}
                <aside className={`w-full md:w-64 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
                    <SearchFilters
                        selectedCategory={selectedCategory}
                        setSelectedCategory={setSelectedCategory}
                        priceRange={priceRange}
                        setPriceRange={setPriceRange}
                        minPrice={0}
                        maxPrice={1000}
                        selectedRating={selectedRating}
                        setSelectedRating={setSelectedRating}
                        onClearFilters={clearFilters}
                    />
                </aside>

                {/* Product Grid */}
                <div className="flex-1 mt-8 md:mt-0">
                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredProducts.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-gray-50 rounded-2xl">
                            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
                            <p className="text-gray-500 mt-2">Try adjusting your filters or search criteria</p>
                            <button
                                onClick={clearFilters}
                                className="mt-4 text-blue-600 hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-24 text-center">Loading...</div>}>
            <ProductListing />
        </Suspense>
    );
}
