import React, { useState, useEffect } from 'react';
import { doc, updateDoc, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase/firebase';
import { deleteOrder } from '../../services';

const OrderManagement = ({ orders = [], loading = false }) => {
  console.log('OrderManagement component - orders:', orders, 'loading:', loading);
  
  // State for real-time orders
  const [realTimeOrders, setRealTimeOrders] = useState([]);
  
  // Real-time listener for orders
  useEffect(() => {
    console.log('OrderManagement: Setting up real-time listener for orders collection');
    const unsubscribe = onSnapshot(collection(db, "orders"), (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRealTimeOrders(ordersData);
      console.log('OrderManagement: Real-time orders updated:', ordersData.length, 'orders');
      console.log('OrderManagement: Order data sample:', ordersData.slice(0, 3).map(o => ({
        id: o.id,
        products: o.products,
        customerName: o.customerName,
        totalAmount: o.totalAmount,
        createdAt: o.createdAt
      })));
    });

    return () => {
      console.log('OrderManagement: Cleaning up real-time listener');
      unsubscribe();
    };
  }, []);

  // Use real-time orders if available, otherwise fall back to props
  const safeOrders = Array.isArray(realTimeOrders.length > 0 ? realTimeOrders : orders) 
    ? (realTimeOrders.length > 0 ? realTimeOrders : orders) 
    : [];
  
  console.log('OrderManagement: safeOrders length:', safeOrders.length);
  console.log('OrderManagement: safeOrders data:', safeOrders.map(o => ({
    id: o.id,
    products: o.products,
    customerName: o.customerName,
    totalAmount: o.totalAmount
  })));
  
  const [updatingStatus, setUpdatingStatus] = useState(null);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({});

  // Update order status function
  const updateOrderStatus = async (orderId, status) => {
    try {
      setUpdatingStatus(orderId);
      const orderRef = doc(db, "orders", orderId);
      await updateDoc(orderRef, {
        status: status,
        updatedAt: new Date()
      });
      console.log('Order status updated:', orderId, status);
    } catch (error) {
      console.error('Error updating order status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleDeleteOrder = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      try {
        await deleteOrder(orderId);
        console.log('Order deleted:', orderId);
      } catch (error) {
        console.error('Error deleting order:', error);
      }
    }
  };

  const handleEditOrder = (order) => {
    console.log('Edit button clicked - order:', order);
    setEditingOrderId(order.id);
    setEditedOrder({
      customerName: order.customerName || '',
      customerPhone: order.customerPhone || order.phone || '',
      totalAmount: order.total || order.totalAmount || order.price || order.amount || 0,
      status: order.status || 'pending'
    });
  };

  const handleSaveOrder = async () => {
    console.log('Save button clicked - editedOrder:', editedOrder);
    try {
      const orderRef = doc(db, "orders", editingOrderId);
      await updateDoc(orderRef, {
        customerName: editedOrder.customerName,
        customerPhone: editedOrder.customerPhone,
        total: editedOrder.totalAmount,
        status: editedOrder.status,
        updatedAt: new Date()
      });
      
      console.log('Order updated successfully:', editingOrderId);
      
      // Exit edit mode
      setEditingOrderId(null);
      setEditedOrder({});
    } catch (error) {
      console.error('Error saving order:', error);
      alert('Error saving order. Please try again.');
    }
  };

  // Function to extract phone and total from existing order message
  const extractAndUpdateOrderData = async (order) => {
    try {
      console.log('Extracting data from existing order:', order.id);
      console.log('Original message:', order.message);
      console.log('Message length:', order.message?.length);
      console.log('Message type:', typeof order.message);
      
      let customerPhone = null;
      let totalAmount = 0;
      
      // Extract phone number from message
      const phonePatterns = [
        /(\+91\s?\d{10})/g,
        /(\d{10})/g,
        /(91\s?\d{10})/g,
        /(\d{11,15})/g  // Added for longer phone numbers
      ];
      
      console.log('Testing phone extraction...');
      for (const pattern of phonePatterns) {
        console.log('Trying phone pattern:', pattern);
        const match = order.message?.match(pattern);
        console.log('Phone match result:', match);
        if (match) {
          customerPhone = match[0].replace(/\s/g, '');
          console.log('Found phone:', customerPhone);
          break;
        }
      }
      
      // Extract total amount from message
      let decodedMessage = order.message || '';
      try {
        decodedMessage = decodeURIComponent(order.message || '');
        console.log('Decoded message:', decodedMessage);
      } catch (e) {
        console.log('Decoding failed, using original message');
        // Keep original message if decoding fails
      }
      
      console.log('Testing decoded message:', decodedMessage);
      
      const pricePatterns = [
        /₹(\d+(?:\.\d{1,2})?)/g,
        /%E2%82%B9(\d+(?:\.\d{1,2})?)/g,
        /Rs\.?\s*(\d+(?:\.\d{1,2})?)/gi,
        /(\d+(?:\.\d{1,2})?)\s*\/\s*kg/gi,
        /(\d+(?:\.\d{1,2})?)/g
      ];
      
      for (const pattern of pricePatterns) {
        console.log('Trying pattern:', pattern);
        const matches = decodedMessage.match(pattern);
        console.log('Matches for pattern:', matches);
        if (matches) {
          const numberMatch = matches[0].match(/(\d+(?:\.\d{1,2})?)/);
          console.log('Number match:', numberMatch);
          if (numberMatch) {
            totalAmount = parseFloat(numberMatch[1]);
            console.log('Extracted total:', totalAmount);
            break;
          }
        }
      }
      
      console.log('Final extracted - Phone:', customerPhone, 'Total:', totalAmount);
      
      // Update the order if we found new data
      if (customerPhone || totalAmount > 0) {
        const orderRef = doc(db, "orders", order.id);
        await updateDoc(orderRef, {
          customerPhone: customerPhone,
          totalAmount: totalAmount,
          total: totalAmount,
          updatedAt: new Date()
        });
        
        console.log('Order updated with extracted data:', order.id);
        alert(`Order updated! Phone: ${customerPhone || 'Not found'}, Total: ₹${totalAmount}`);
        
        // Force a refresh by triggering a re-render
        setTimeout(() => {
          console.log('Forcing UI refresh after update');
        }, 100);
      } else {
        console.log('No data found, message:', order.message);
        alert('No phone number or total found in the message. Check console for details.');
      }
    } catch (error) {
      console.error('Error updating order:', error);
      alert('Error updating order: ' + error.message);
    }
  };

  const handleCancelEdit = () => {
    console.log('Cancel button clicked');
    setEditingOrderId(null);
    setEditedOrder({});
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'preparing': return 'bg-purple-100 text-purple-800';
      case 'ready': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSourceColor = (source) => {
    switch(source) {
      case 'whatsapp': return 'bg-green-100 text-green-800';
      case 'website': return 'bg-blue-100 text-blue-800';
      case 'phone': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-full">
      {loading ? (
        // Loading skeleton
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-sm p-4 lg:p-6 animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl shadow-sm overflow-hidden animate-pulse">
            <div className="h-16 bg-gray-200"></div>
            <div className="space-y-2 p-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Orders Table */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 lg:px-6 py-4 lg:py-6 border-b border-gray-200">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Recent Orders</h2>
              <div className="text-sm text-gray-500 mt-1">
                Total Orders: {safeOrders.length}
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Products
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {safeOrders.length > 0 ? (
                    safeOrders.map((order) => {
                      console.log('🔍 DEBUG - Rendering order:', order.id);
                      console.log('🔍 DEBUG - Order fields:', {
                        id: order.id,
                        product: order.product,
                        products: order.products,
                        message: order.message,
                        customerName: order.customerName,
                        totalAmount: order.totalAmount
                      });
                      return (
                        <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.orderNumber || order.id?.slice(0, 8) || 'N/A'}
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {editingOrderId === order.id ? (
                              <input
                                type="text"
                                value={editedOrder.customerName}
                                onChange={(e) => setEditedOrder({...editedOrder, customerName: e.target.value})}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                              />
                            ) : (
                              order.customerName || 'WhatsApp Customer'
                            )}
                          </div>
                          <div className="text-xs text-gray-500">
                            {editingOrderId === order.id ? (
                              <input
                                type="text"
                                value={editedOrder.customerPhone}
                                onChange={(e) => setEditedOrder({...editedOrder, customerPhone: e.target.value})}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-xs mt-1"
                              />
                            ) : (
                              order.customerPhone || order.phone ? `+91 ${order.customerPhone || order.phone}` : 'No phone'
                            )}
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 text-sm text-gray-900">
                          <div className="max-w-xs">
                            <div className="text-sm font-medium">{order.product || order.products || order.message?.match(/I want to order (.+?)(?:\s*-\s*|$)/)?.[1] || 'N/A'}</div>
                            {order.quantity && (
                              <div className="text-xs text-gray-500 mt-1">
                                Quantity: {order.quantity}
                              </div>
                            )}
                            {order.message && (
                              <div className="text-xs text-gray-500 mt-1 truncate" title={order.message}>
                                {order.message}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getSourceColor(order.source)}`}>
                            {order.source || 'unknown'}
                          </span>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {editingOrderId === order.id ? (
                            <input
                              type="number"
                              value={editedOrder.totalAmount}
                              onChange={(e) => setEditedOrder({...editedOrder, totalAmount: e.target.value})}
                              className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                            />
                          ) : (
                            <div className="text-lg font-bold text-green-600">
                              ₹{order.total && order.total !== "1" ? order.total : (order.totalAmount || order.price || order.amount || 0)}
                            </div>
                          )}
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          {editingOrderId === order.id ? (
                            <select 
                              value={editedOrder.status}
                              onChange={(e) => setEditedOrder({...editedOrder, status: e.target.value})}
                              className="text-xs border border-gray-300 rounded px-2 py-1"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          ) : (
                            <div className="flex items-center space-x-2">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                {order.status || 'pending'}
                              </span>
                              <select
                                value={order.status || 'pending'}
                                onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                                disabled={updatingStatus === order.id}
                                className="text-xs border border-gray-300 rounded px-2 py-1"
                              >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="preparing">Preparing</option>
                                <option value="ready">Ready</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                              </select>
                              {updatingStatus === order.id && (
                                <span className="ml-2 text-xs text-blue-600">Updating...</span>
                              )}
                            </div>
                          )}
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formatDate(order.createdAt)}
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {editingOrderId === order.id ? (
                            <div className="flex space-x-2">
                              <button 
                                onClick={handleSaveOrder}
                                className="text-green-600 hover:text-green-900 font-medium px-3 py-2 border border-green-300 rounded text-xs bg-green-50"
                              >
                                💾 Save
                              </button>
                              <button 
                                onClick={handleCancelEdit}
                                className="text-gray-600 hover:text-gray-900 font-medium px-3 py-2 border border-gray-300 rounded text-xs bg-gray-50"
                              >
                                ❌ Cancel
                              </button>
                            </div>
                          ) : (
                            <div className="flex space-x-2">
                              <button 
                                onClick={() => handleEditOrder(order)}
                                className="text-blue-600 hover:text-blue-900 font-medium px-2 py-1 border border-blue-300 rounded text-xs"
                              >
                                Edit
                              </button>
                              <button 
                                onClick={() => deleteOrder(order.id)}
                                className="text-red-600 hover:text-red-900 font-medium px-2 py-1 border border-red-300 rounded text-xs"
                              >
                                Delete
                              </button>
                              {console.log('Button condition check:', {
                                customerPhone: order.customerPhone,
                                phone: order.phone,
                                totalAmount: order.totalAmount,
                                total: order.total,
                                shouldShow: (!order.customerPhone && !order.phone && (order.totalAmount === 0 || order.total === "1"))
                              })}
                              <button 
                                onClick={() => extractAndUpdateOrderData(order)}
                                className="text-purple-600 hover:text-purple-900 font-medium px-2 py-1 border border-purple-300 rounded text-xs"
                                title="Extract phone and total from message"
                              >
                                Extract Data
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center">
                          <i className="fas fa-shopping-cart text-4xl text-gray-300 mb-4"></i>
                          <p className="text-lg font-medium text-gray-900 mb-2">No orders found</p>
                          <p className="text-sm text-gray-500">Orders will appear here when customers place them via WhatsApp or website</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderManagement;
