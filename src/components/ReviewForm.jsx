import React, { useState } from 'react';
import { submitReview } from '../services';

const ReviewForm = ({ productId, productName, onReviewSubmitted, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: '',
    ...(productId && { productId }),
    ...(productName && { productName })
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Review submission started:', formData);
    
    // Basic validation
    if (!formData.name.trim() || !formData.comment.trim()) {
      setError('Please fill in all required fields');
      return;
    }
    
    if (formData.rating < 1 || formData.rating > 5) {
      setError('Please select a valid rating');
      return;
    }

    setLoading(true);
    setError('');

    try {
      console.log('Submitting review to Firebase...');
      
      await submitReview(formData);
      console.log('Review submitted successfully!');
      
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        rating: 5,
        comment: '',
        ...(productId && { productId }),
        ...(productName && { productName })
      });
      
      // Notify parent component
      if (onReviewSubmitted) {
        onReviewSubmitted();
      }
      
      // Close form after 2 seconds
      setTimeout(() => {
        if (onClose) onClose();
      }, 2000);
      
    } catch (error) {
      console.error('Error submitting review:', error);
      console.error('Error details:', error.code, error.message);
      
      // Provide more specific error messages
      if (error.code === 'permission-denied') {
        setError('Permission denied. Please check Firebase rules.');
      } else if (error.code === 'unavailable') {
        setError('Service unavailable. Please try again later.');
      } else if (error.code === 'resource-exhausted') {
        setError('Quota exceeded. Please try again later.');
      } else {
        setError(`Failed to submit review: ${error.message || 'Unknown error'}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const StarRating = ({ value, onChange }) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onChange(star)}
            className="text-2xl transition-colors duration-200"
          >
            <i
              className={`fas fa-star ${
                star <= value ? 'text-yellow-400' : 'text-gray-300'
              } hover:text-yellow-400`}
            ></i>
          </button>
        ))}
      </div>
    );
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i className="fas fa-check text-green-600 text-2xl"></i>
        </div>
        <h3 className="text-lg font-semibold text-green-800 mb-2">Review Submitted!</h3>
        <p className="text-green-600 text-sm">
          Thank you for your review. It will be visible after admin approval.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold text-gray-900">
          Review {productName || 'Product'}
        </h3>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email (optional)
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating *
          </label>
          <StarRating 
            value={formData.rating} 
            onChange={(rating) => setFormData({...formData, rating})}
          />
          <p className="text-xs text-gray-500 mt-1">
            Click on stars to rate (1-5)
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Your Review *
          </label>
          <textarea
            value={formData.comment}
            onChange={(e) => setFormData({...formData, comment: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="4"
            placeholder="Share your experience with this product..."
            required
          ></textarea>
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <i className="fas fa-spinner fa-spin mr-2"></i>
                Submitting...
              </span>
            ) : (
              'Submit Review'
            )}
          </button>
          
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-blue-600 text-xs">
          <i className="fas fa-info-circle mr-1"></i>
          Your review will be visible after admin approval. Please be respectful and constructive.
        </p>
      </div>
    </div>
  );
};

export default ReviewForm;
