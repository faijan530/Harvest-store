import React, { useState } from 'react';
import ReviewForm from './ReviewForm';

const FloatingReviewButton = () => {
  const [showReviewForm, setShowReviewForm] = useState(false);

  return (
    <>
      {/* Floating Review Button */}
      <button
        onClick={() => setShowReviewForm(true)}
        className="fixed bottom-6 left-6 z-40 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 group"
        title="Write a Review"
      >
        <div className="relative">
          <i className="fas fa-star text-xl"></i>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        </div>
        <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Write a Review
        </span>
      </button>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ReviewForm
              onReviewSubmitted={() => setShowReviewForm(false)}
              onClose={() => setShowReviewForm(false)}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingReviewButton;
