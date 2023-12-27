import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';

const Checkout = ({ cartItems }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [location, setLocation] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(null);
  const [buyNowClicked, setBuyNowClicked] = useState(false);
  const [purchaseClicked, setPurchaseClicked] = useState(false);

  const handleBuyNow = () => {
    setBuyNowClicked(true);
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.product.price * item.order_count, 0);
  };

  const handleConfirmPurchase = () => {
    setPurchaseClicked(true);
    setShowCheckout(false);
    setRecipientName('');
    setPhoneNumber('');
    setGiftMessage('');
    setLocation('');
    setDeliveryDate(null);
  };

  return (
    <div>
      {!buyNowClicked && (
        <div className="my-4">
          <button
            onClick={handleBuyNow}
            className="bg-indigo-900 hover:bg-indigo-900 text-white font-bold py-2 px-4 rounded"
          >
            Buy Now
          </button>
        </div>
      )}

      {buyNowClicked && !purchaseClicked && (
        <div className="bg-white shadow-s p-4 rounded-md" style={{ maxWidth: '400px', marginLeft: '64.57%' }}>
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          {Array.isArray(cartItems) ? (
            cartItems.map((item) => (
              <div key={item.order_id} className="flex justify-between mb-2">
                <span>{item.product.product_name} x {item.order_count}</span>
                <span>${item.product.price * item.order_count}</span>
              </div>
            ))
          ) : (
            <p>Invalid cart items</p>
          )}
          <hr className="my-2" />
          <div className="flex justify-between">
            <span className="font-semibold">Total:</span>
            <span>${calculateTotal()}</span>
          </div>
          <button
            onClick={handleConfirmPurchase}
            className="mt-8 bg-indigo-900 text-white font-bold py-2 px-2 rounded"
          >
            CHECKOUT
          </button>
        </div>
      )}

      {purchaseClicked && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-md mt-8" style={{ width: '80vw', maxWidth: '400px' }}>
            <img
              src="https://images.inc.com/uploaded_files/image/1920x1080/getty_497443324_2000133420009280346_337382.jpg"
              alt="images"
              className="mb-2 rounded-md"
              style={{ width: '100%', height: 'auto' }}
            />
            <h2 className="text-lg font-semibold mb-4">Enter Recipient Details</h2>
            <form className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="recipientName" className="block text-sm font-medium text-gray-700">
                    Recipient Name:
                  </label>
                  <input
                    type="text"
                    id="recipientName"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
                <div>
                  <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                    Phone Number:
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="mt-1 p-2 w-full border rounded-md"
                  />
                </div>
              </div>

             
              <div className="grid grid-cols-2 gap-4">

              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                  Location:
                </label>
                <select
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select Location</option>
                  <option value="amman">Amman</option>
                  <option value="zarqa">Zarqa</option>
                  <option value="mafraq">Mafraq</option>
                  <option value="irbid">Irbid</option>
                  <option value="salt">Salt</option>
                  <option value="balqaa">Balqaa</option>
                  <option value="jerash">Jerash</option>
                  <option value="ajloun">Ajloun</option>
                </select>
              </div>

              <div>
                <label htmlFor="deliveryDate" className="block text-sm font-medium text-gray-700">
                  Delivery Date:
                </label>
                <DatePicker
                  id="deliveryDate"
                  selected={deliveryDate}
                  onChange={(date) => setDeliveryDate(date)}
                  minDate={new Date()}
                  dateFormat="dd/MM/yyyy"
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              </div>
              <div>
                <label htmlFor="giftMessage" className="block text-sm font-medium text-gray-700">
                  Gift Message:
                </label>
                <textarea
                  id="giftMessage"
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  className="mt-1 p-2 w-full border rounded-md"
                />
              </div>
              <button
                type="button"
                onClick={async () => {
                  const getCookie = (name) => {
                    const cookies = document.cookie.split(';');
                    const cookie = cookies.find(c => c.trim().startsWith(name + '='));
                    return cookie ? cookie.split('=')[1] : null;
                  };
                  const token = getCookie('accessToken');
                  try {
                    axios.defaults.headers.common['Authorization'] = token;
                    const response = await axios.post("http://localhost:8080/addRecipientInfo", {
                      recipientName,
                      phoneNumber,
                      giftMessage,
                      location,
                      deliveryDate,
                      cartItems,
                    });

                    if (response.status === 200) {
                      setPurchaseClicked(true);
                      const responseData = response.data;
                      window.location.href = responseData;
                      console.log(responseData);
                    } else {
                      console.error("error");
                    }
                  } catch (error) {
                    console.error("error", error);
                  }
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Confirm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;