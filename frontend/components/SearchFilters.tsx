'use client';

import { CATEGORIES } from '@/utils/mockData';
import { Star, RotateCcw } from 'lucide-react';

interface SearchFiltersProps {
    selectedCategory: string;
    setSelectedCategory: (category: string) => void;
    priceRange: [number, number];
    setPriceRange: (range: [number, number]) => void;
    minPrice: number;
    maxPrice: number;
    selectedRating: number | null;
    setSelectedRating: (rating: number | null) => void;
    onClearFilters: () => void;
}

export default function SearchFilters({
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    minPrice,
    maxPrice,
    selectedRating,
    setSelectedRating,
    onClearFilters
}: SearchFiltersProps) {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                <button
                    onClick={onClearFilters}
                    className="text-sm text-blue-600 hover:text-blue-700 flex items-center"
                >
                    <RotateCcw size={14} className="mr-1" /> Clear
                </button>
            </div>

            {/* Categories */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
                <div className="space-y-2">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="radio"
                            name="category"
                            checked={selectedCategory === ''}
                            onChange={() => setSelectedCategory('')}
                            className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
                        />
                        <span className={selectedCategory === '' ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                            All Categories
                        </span>
                    </label>
                    {CATEGORIES.map((category) => (
                        <label key={category} className="flex items-center space-x-3 cursor-pointer">
                            <input
                                type="radio"
                                name="category"
                                checked={selectedCategory === category}
                                onChange={() => setSelectedCategory(category)}
                                className="form-radio text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                            <span className={selectedCategory === category ? 'text-blue-600 font-medium' : 'text-gray-600'}>
                                {category}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price Range */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">Price Range</h4>
                <div className="px-2">
                    <input
                        type="range"
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Rating */}
            <div>
                <h4 className="font-medium text-gray-900 mb-4">Rating</h4>
                <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                            className={`flex items-center w-full px-3 py-2 rounded-lg transition-colors ${selectedRating === rating ? 'bg-blue-50 border border-blue-200' : 'hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center mr-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        className={`${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className={`text-sm ${selectedRating === rating ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>
                                & Up
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
