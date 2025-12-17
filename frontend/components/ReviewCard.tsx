import { Review } from '@/utils/mockData';
import { Star, CheckCircle } from 'lucide-react';

interface ReviewCardProps {
    review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
    return (
        <div className="bg-white p-6 rounded-xl border border-gray-100">
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg">
                        {review.userName.charAt(0)}
                    </div>
                    <div>
                        <h4 className="font-medium text-gray-900">{review.userName}</h4>
                        <div className="flex items-center text-xs text-gray-500">
                            <span className="mr-2">{new Date(review.date).toLocaleDateString()}</span>
                            {review.verified && (
                                <span className="flex items-center text-green-600">
                                    <CheckCircle size={12} className="mr-1" />
                                    Verified Purchase
                                </span>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star
                            key={i}
                            size={16}
                            className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                                }`}
                        />
                    ))}
                </div>
            </div>
            <p className="text-gray-600 leading-relaxed">{review.comment}</p>
        </div>
    );
}
