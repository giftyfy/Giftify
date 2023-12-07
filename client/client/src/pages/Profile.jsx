import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userId, setUserId] = useState(1);
  const [userData, setUserData] = useState({
    image: '',
  });

  const [newUserData, setNewUserData] = useState({
    f_name: '',
    l_name: '',
    user_email: '',
    user_password: '',
  });

  const [userImage, setUserImage] = useState('');

  const [activeTab, setActiveTab] = useState('EditProfile');
  const [wishlistData, setWishlistData] = useState(null);
  const [orderHistoryData, setOrderHistoryData] = useState(null);
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null); 

  const fetchUserData = () => {
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
      };
      const token = getCookie('accessToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`http://localhost:8080/getUserData`)
      .then(response => {
        console.log(response.data);
        setUserData(response.data);
        setNewUserData({ f_name: response.data.username, l_name: response.data.lastname, user_email: response.data.email });
      })
      .catch(error => {
        console.error('Error fetching user data: ', error);
      });
  };

  const handleSaveDataChanges = () => {
    const updatedUserData = {
      f_name: newUserData.f_name,
      l_name: newUserData.l_name,
      user_email: newUserData.user_email,
      user_password: newUserData.user_password,
    };
    console.log(updatedUserData)
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
      };
      const token = getCookie('accessToken');
    axios.defaults.headers.common['Authorization'] = token;
    console.log(updatedUserData);
    axios.put(`http://localhost:8080/UpdateUserData`, updatedUserData)
      .then(response => {
        alert('Data changes saved successfully');
        console.log('Response data:', response.data);
        fetchUserData();
      })
      .catch(error => {
        console.error('Error saving data changes: ', error);
      });
  };

  const fetchWishlistData = () => {
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
      };
      const token = getCookie('accessToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`http://localhost:8080/getwishlist`)
      .then(response => {
        console.log(response.data);
        setWishlistData(response.data);
      })
      .catch(error => {
        console.error('Error fetching wishlist data: ', error);
      });
  };

  const fetchOrderHistoryData = () => {
    const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
      };
      const token = getCookie('accessToken');
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`http://localhost:8080/getOrderHistory`)
      .then(response => {
        setOrderHistoryData(response.data);
      })
      .catch(error => {
        console.error('Error fetching order history data: ', error);
      });
  };

  const fetchOrderDetails = (orderId) => {
    axios.get(`http://localhost:8080/getOrderDetails`)
      .then(response => {
        setSelectedOrderDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching order details: ', error);
      });
  };

  useEffect(() => {
    fetchUserData();
    fetchWishlistData();
    fetchOrderHistoryData();
  }, [userId]);

  const changeUserId = (newUserId) => {
    setUserId(newUserId);
  };

  const inputStyle = {
    background: "rgb(255, 255, 255, 20%)",
    border: "1px solid #A5A5A5",
    borderRadius: "8px",
    padding: "2.5px",
    height: "3rem",
    color: "rgb(92, 92, 66)",
  };

  return (
    <div className="flex">
      <div className="w-1/4 p-4">
        <img
          src={userImage || "https://img.freepik.com/premium-vector/avatar-icon002_750950-52.jpg?size=338&ext=jpg&ga=GA1.1.1880011253.1699056000&semt=ais"}
          alt="User Image"
          className="h-32 w-32 rounded-full mx-auto mb-4"
        />
        <div className="text-center">
          <span className="font-medium text-gray-900">{`${userData.f_name} ${userData.l_name}`}</span>
          <span className="text-gray-500 block">{userData.user_email}</span>
        </div>
      </div>

      <div className="w-3/4 p-4">
        <ul className="text-sm font-medium text-center text-gray-500 divide-x divide-gray-200 rounded-lg shadow sm:flex dark:divide-gray-700 dark:text-gray-400">
          <li className="w-full">
            <a href="#" onClick={() => setActiveTab('EditProfile')} className={`inline-block w-full p-4 ${activeTab === 'EditProfile' ? 'text-gray-900 bg-gray-100' : 'bg-white hover:text-gray-700 hover-bg-gray-50'} rounded-l-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white`} aria-current={activeTab === 'EditProfile' ? 'page' : null}>
              Edit Profile
            </a>
          </li>

          <li className="w-full">
            <a href="#" onClick={() => setActiveTab('OrderHistory')} className={`inline-block w-full p-4 ${activeTab === 'OrderHistory' ? 'bg-white hover-text-gray-700 hover-bg-gray-50' : 'dark-bg-gray-800 dark-hover-text-white dark-hover-bg-gray-700'} focus-ring-4 focus-ring-blue-300 focus-outline-none`} aria-current={activeTab === 'OrderHistory' ? 'page' : null}>
              Order History
            </a>
          </li>
          <li className="w-full">
            <a href="#" onClick={() => setActiveTab('WishList')} className={`inline-block w-full p-4 ${activeTab === 'WishList' ? 'bg-white hover-text-gray-700 hover-bg-gray-50' : 'dark-bg-gray-800 dark-hover-text-white dark-hover-bg-gray-700'} rounded-r-lg focus-ring-4 focus-outline-none focus-ring-blue-300`} aria-current={activeTab === 'WishList' ? 'page' : null}>
              Wish List
            </a>
          </li>
        </ul>

        {activeTab === 'EditProfile' && (
          <div>
            <div className="flex justify-center mt-20 px-8">
              <form className="max-w-2xl" encType="multipart/form-data" action="/update-profile" method="post">
                <div className="flex flex-wrap border shadow rounded-lg p-3 dark:bg-gray-600">
                  <h2 className="text-xl text-gray-600 dark:text-gray-300 pb-2">Account settings:</h2>

                  <div className="flex flex-col gap-2 w-full border-gray-400">
                    <div>
                      <label className="text-gray-600 dark:text-gray-400">First Name</label>
                      <input
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark-bg-gray-600 dark:text-gray-100"
                        type="text"
                        style={inputStyle}
                        value={newUserData.f_name}
                        onChange={(e) => setNewUserData({ ...newUserData, f_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-gray-600 dark:text-gray-400">Last Name</label>
                      <input
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark-bg-gray-600 dark:text-gray-100"
                        type="text"
                        style={inputStyle}
                        value={newUserData.l_name}
                        onChange={(e) => setNewUserData({ ...newUserData, l_name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-gray-600 dark:text-gray-400">Password</label>
                      <input
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark-bg-gray-600 dark:text-gray-100"
                        type="password"
                        style={inputStyle}
                        value={newUserData.user_password}
                        onChange={(e) => setNewUserData({ ...newUserData, user_password: e.target.value })}
                      />
                    </div>

                    <div>
                      <label className="text-gray-600 dark:text-gray-400">Email</label>
                      <input
                        className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow dark-bg-gray-600 dark:text-gray-100"
                        type="email"
                        style={inputStyle}
                        value={newUserData.user_email}
                        onChange={(e) => setNewUserData({ ...newUserData, user_email: e.target.value })}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={handleSaveDataChanges}
                        className="py-1.5 px-3 m-1 text-center bg-gray-800 border rounded-md text-white hover:bg-gray-800 hover:text-gray-100 dark-text-gray-200 dark-bg-violet-700"
                        type="button"
                      >
                        Save Data Changes
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {activeTab === 'OrderHistory' && (
      <div>
      <h2>Order History</h2>
      {orderHistoryData && orderHistoryData.length > 0 ? (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product ID</th>
              <th className="py-2 px-4 border-b">Product Name</th>
              <th className="py-2 px-4 border-b">Description</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Product Rating</th>
            </tr>
          </thead>
          <tbody>
            {orderHistoryData.map((item) => (
              <tr key={item.product_id} className="hover:bg-gray-100">
<td className="py-8 px-8 border-b">{item.Product && item.Product.product_id}</td>
                <td className="py-8 px-8 border-b">{item.Product.product_name}</td>
                <td className="py-8 px-8 border-b">{item.Product.description}</td>
                <td className="py-8 px-8 border-b">{item.Product.price}</td>
                <td className="py-8 px-8 border-b">{item.Product.product_rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
       

        <p className="text-gray-500">No Items In The Your History.</p>
      )}
    </div>
  )}
        {activeTab === 'WishList' && (
          <div>
            <h2>Wishlist:</h2>
            {wishlistData && wishlistData.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b">Product ID</th>
                    <th className="py-2 px-4 border-b">Product Name</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Price</th>
                    <th className="py-2 px-4 border-b">Product Rating</th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistData.map((item) => (
                    <tr key={item.product_id} className="hover:bg-gray-100">
                      <td className="py-8 px-8 border-b">{item.Product.product_id}</td>
                      <td className="py-8 px-8 border-b">{item.Product.product_name}</td>
                      <td className="py-8 px-8 border-b">{item.Product.description}</td>
                      <td className="py-8 px-8 border-b">{item.Product.price}</td>
                      <td className="py-8 px-8 border-b">{item.Product.product_rating}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
             

              <p className="text-gray-500">No items in the wishlist.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
