// OrderHistory.js

import React from 'react';

const OrderHistory = ({ cartItems }) => {
  return (
    <div className="bg-white shadow-md p-4">
      <h2 className="text-lg font-semibold mb-4">Order History</h2>
      {Array.isArray(cartItems) ? (
        cartItems.map((item) => (
          <div key={item.order_id} className="flex justify-between mb-2">
            <span>
              {item.product.product_name} x {item.order_count}
            </span>
            <span>${item.product.price * item.order_count}</span>
          </div>
        ))
      ) : (
        <p>No order history available.</p>
      )}
    </div>
  );
};

export default OrderHistory;
