import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Checkout from './Checkout';

const Cart = () => {
  const getCookie = (name) => {
    const cookies = document.cookie.split(';');
    const cookie = cookies.find((c) => c.trim().startsWith(name + '='));
    return cookie ? cookie.split('=')[1] : null;
  };
  const token = getCookie('accessToken');

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    axios.defaults.headers.common['Authorization'] = token;
    axios
      .get('http://localhost:8080/getCart')
      .then((response) => {
        setCartItems(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  const handleIncrement = (itemId) => {
    axios.defaults.headers.common['Authorization'] = token;
    axios
      .put(`http://localhost:8080/orderIncrement/${itemId}`, { action: 'increment' })
      .then(() => {
        fetchCartData();
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleDecrement = (itemId) => {
    axios.defaults.headers.common['Authorization'] = token;
    axios
      .put(`http://localhost:8080/orderDecrement/${itemId}`, { action: 'decrement' })
      .then(() => {
        fetchCartData();
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  const handleRemove = (itemId, isOrder = false) => {
    axios.defaults.headers.common['Authorization'] = token;
    const params = isOrder ? { order_id: itemId } : { product_id: itemId };

    axios
      .put('http://localhost:8080/removeFromOrders', { params })
      .then(() => {
        fetchCartData();
      })
      .catch((error) => {
        console.error('Error removing item:', error);
      });
  };

  return (
    <section className="py-24 bg-gray-100 font-poppins">
      <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <div>
          <h2 className="mb-8 text-4xl font-bold">Your Cart</h2>
          <div className="p-6 mb-8 border bg-gray-50  ">
            <div className="px-4 py-6 sm:px-8 sm:py-10">
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  
                  {cartItems.map((item) => (
                    <div
                      key={item.order_id}
                      className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0"
                    >
                      <div className="shrink-0">
                        <img
                          className="h-24 w-24 max-w-full rounded-lg object-cover"
                          src={item.product.img_url}
                          alt={item.product.product_name}
                        />
                      </div>
                      <div className="relative flex flex-1 flex-col justify-between">
                        <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                          <div className="pr-8 sm:pr-5">
                            <p className="text-base font-semibold text-gray-900">{item.product.product_name}</p>
                            <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">Count: {item.order_count}</p>
                          </div>
                          <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                            <div className="flex items-center">
                              <button
                                onClick={() => handleDecrement(item.order_id)}
                                className="bg-gray-200 p-2 rounded-md"
                              >
                                -
                              </button>
                              <p className="mx-2 text-base font-semibold text-gray-900">{item.order_count}</p>
                              <button
                                onClick={() => handleIncrement(item.order_id)}
                                className="bg-gray-200 p-2 rounded-md"
                              >
                                +
                              </button>
                            </div>
                            <p className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">
                              Total: ${item.product.price * item.order_count}
                            </p>
                          </div>
                        </div>
                        <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                          <button
                            onClick={() => handleRemove(item.order_id, true)}
                            className="bg-indigo-900  p-2 rounded-md text-white"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-wrap justify-between">
          
            <div className="w-full px-4 mb-4 lg:w-1/2">
          
              </div>
            </div>
          </div>
        </div>
      <Checkout cartItems={cartItems} />
    </section>
  );
};

export default Cart;
