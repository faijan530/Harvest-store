import React, { useState, useEffect } from 'react';
import { getApprovedReviews } from '../services';
import ReviewForm from './ReviewForm';

const ReviewSection = ({ productId, productName }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const approvedReviews = await getApprovedReviews();
      
      // Filter reviews for this specific product if productId is provided
      const productReviews = productId 
        ? approvedReviews.filter(review => review.productId === productId)
        : approvedReviews;
      
      setReviews(productReviews);
    } catch (error) {
      console.error('Error loading reviews:', error);
      setError('Failed to load reviews');
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmitted = () => {
    loadReviews(); // Reload reviews to show the new one (after approval)
  };

  const renderStars = (rating) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`fas fa-star text-sm ${
              star <= rating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          ></i>
        ))}
      </div>
    );
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">
          Customer Reviews
          {productName && ` for ${productName}`}
        </h2>
        <button
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center space-x-2"
        >
          <i className="fas fa-plus"></i>
          <span>Write Review</span>
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Review Form */}
      {showReviewForm && (
        <div className="mb-8">
          <ReviewForm
            productId={productId}
            productName={productName}
            onReviewSubmitted={handleReviewSubmitted}
            onClose={() => setShowReviewForm(false)}
          />
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fas fa-star text-gray-400 text-2xl"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Yet</h3>
          <p className="text-gray-600 mb-4">
            Be the first to share your experience with this product!
          </p>
          <button
            onClick={() => setShowReviewForm(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Write First Review
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Review Summary */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-3xl font-bold text-gray-900">
                    {reviews.length > 0 
                      ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
                      : '0'
                    }
                  </span>
                  <div className="flex flex-col">
                    {renderStars(reviews.length > 0 
                      ? Math.round(reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length)
                      : 0
                    )}
                    <span className="text-sm text-gray-600">
                      {reviews.length} {reviews.length === 1 ? 'Review' : 'Reviews'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              >
                Add Review
              </button>
            </div>
          </div>

          {/* Individual Reviews */}
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-gray-900">{review.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500">
                        {formatDate(review.createdAt)}
                      </span>
                    </div>
                  </div>
                  {review.productName && (
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {review.productName}
                    </span>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewSection;
