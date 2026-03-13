import React, { useState, useEffect } from 'react';
import { deleteCustomer } from '../../services';

const CustomerManagement = ({ customers = [], loading = false, onCustomerDeleted }) => {
  const [deletingCustomerId, setDeletingCustomerId] = useState(null);

  const handleDeleteCustomer = async (customerId) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        setDeletingCustomerId(customerId);
        console.log('Deleting customer:', customerId);
        await deleteCustomer(customerId);
        console.log('Customer deleted successfully:', customerId);
        
        // Call the refresh function if provided
        if (onCustomerDeleted) {
          onCustomerDeleted(customerId);
        }
        
        setDeletingCustomerId(null);
      } catch (error) {
        console.error('Error deleting customer:', error);
        setDeletingCustomerId(null);
        alert('Error deleting customer. Please try again.');
      }
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-red-100 text-red-800';
      case 'vip': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full">
      {loading ? (
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
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 lg:px-6 py-4 lg:py-6 border-b border-gray-200">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-900">Customers</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Orders
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {customers.length > 0 ? (
                    customers.map((customer) => (
                      <tr key={customer.id} className="hover:bg-gray-50">
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                              <i className="fas fa-user text-gray-600"></i>
                            </div>
                            <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                          </div>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {customer.email || 'customer@freshstore.com'}
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {customer.phone || '+919876543210'}
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {customer.totalOrders || 0}
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(customer.status)}`}>
                            {customer.status || 'active'}
                          </span>
                        </td>
                        <td className="px-3 lg:px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => handleDeleteCustomer(customer.id)}
                            disabled={deletingCustomerId === customer.id}
                            className={`font-medium px-2 py-1 border rounded text-xs ${
                              deletingCustomerId === customer.id
                                ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                                : 'text-red-600 hover:text-red-900 border-red-300 hover:bg-red-50'
                            }`}
                          >
                            {deletingCustomerId === customer.id ? 'Deleting...' : 'Delete'}
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                        No customers found
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

export default CustomerManagement;
