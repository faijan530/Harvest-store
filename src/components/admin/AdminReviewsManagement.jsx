import React, { useState, useEffect } from 'react';
import { getAllReviews, approveReview, deleteReview } from '../../services';

const AdminReviewsManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const reviewsData = await getAllReviews();
      setReviews(reviewsData || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveReview = async (reviewId) => {
    try {
      await approveReview(reviewId);
      setReviews(reviews.map(review => 
        review.id === reviewId 
          ? { ...review, status: 'approved', approvedAt: new Date() }
          : review
      ));
    } catch (error) {
      console.error('Error approving review:', error);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      try {
        await deleteReview(reviewId);
        setReviews(reviews.filter(review => review.id !== reviewId));
        setSelectedReview(null);
      } catch (error) {
        console.error('Error deleting review:', error);
      }
    }
  };

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || review.status === filter;
    const matchesSearch = review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (review.productName && review.productName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status) => {
    return status === 'approved' 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-yellow-100 text-yellow-800 border-yellow-200';
  };

  const getStatusIcon = (status) => {
    return status === 'approved' 
      ? 'fas fa-check-circle'
      : 'fas fa-clock';
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
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Reviews Management</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <span>Total: {reviews.length}</span>
          <span>•</span>
          <span className="text-yellow-600">Pending: {reviews.filter(r => r.status === 'pending').length}</span>
          <span>•</span>
          <span className="text-green-600">Approved: {reviews.filter(r => r.status === 'approved').length}</span>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All ({reviews.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Pending ({reviews.filter(r => r.status === 'pending').length})
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'approved' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Approved ({reviews.filter(r => r.status === 'approved').length})
            </button>
          </div>
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search reviews by name, comment, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-star text-gray-400 text-2xl"></i>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Reviews Found</h3>
            <p className="text-gray-600">
              {filter === 'pending' 
                ? 'No pending reviews to review.'
                : filter === 'approved'
                ? 'No approved reviews yet.'
                : 'No reviews submitted yet.'
              }
            </p>
          </div>
        ) : (
          filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-gray-900">{review.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(review.status)}`}>
                      <i className={`fas ${getStatusIcon(review.status)} mr-1`}></i>
                      {review.status}
                    </span>
                    {review.productName && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                        {review.productName}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                    <div className="flex items-center space-x-1">
                      {renderStars(review.rating)}
                      <span className="ml-1">{review.rating}.0</span>
                    </div>
                    <span>•</span>
                    <span>{formatDate(review.createdAt)}</span>
                    {review.email && (
                      <>
                        <span>•</span>
                        <span>{review.email}</span>
                      </>
                    )}
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-2">
                  {review.status === 'pending' && (
                    <button
                      onClick={() => handleApproveReview(review.id)}
                      className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <i className="fas fa-check"></i>
                      <span>Approve</span>
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteReview(review.id)}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <i className="fas fa-trash"></i>
                    <span>Delete</span>
                  </button>
                </div>
                {review.status === 'approved' && review.approvedAt && (
                  <span className="text-sm text-gray-500">
                    Approved on {formatDate(review.approvedAt)}
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminReviewsManagement;
