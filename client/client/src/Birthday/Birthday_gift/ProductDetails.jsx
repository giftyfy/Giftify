import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getdetails/${id}`);
        setProduct(response.data.product);
        setComments(response.data.reactions);
        setUserName(response.data.userName);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();
  }, [id, isSubmitting]);


  const addToCart = async (id) => {
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      const cookie = cookies.find(c => c.trim().startsWith(name + '='));
      return cookie ? cookie.split('=')[1] : null;
    };
    const token = getCookie('accessToken');

    const productData = {
      product_id: id,
      price: product.price,
    };

    try {
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.post(`http://localhost:8080/addToOrdaers`, {
        productData: productData,
      });
      console.log("Product added to cart:", response.data);

      toast.success('Product added to cart!', {
        position: "bottom-right",
        autoClose: 500,
      });

    } catch (error) {
      console.error("Error adding product to cart: ", error);
      window.location.href = `http://localhost:3000/signin`;
    }
  };

  const addToWishlist = async (id) => {
    try {
      const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
      };
      const token = getCookie('accessToken');
      axios.defaults.headers.common['Authorization'] = token;
      const response = await axios.post(`http://localhost:8080/addToWishlist/${id}`);

      toast.success('Product added to Wishlist!', {
        position: "bottom-right",
        autoClose: 500,
      });

      console.log("Product added to Wishlist:", response.data);

    } catch (error) {
      console.error("Error adding product to Wishlist: ", error);
      window.location.href = `http://localhost:3000/signin`;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const getCookie = (name) => {
        const cookies = document.cookie.split(';');
        const cookie = cookies.find(c => c.trim().startsWith(name + '='));
        return cookie ? cookie.split('=')[1] : null;
      };
      const token = getCookie('accessToken');
      axios.defaults.headers.common['Authorization'] = token;

      const response = await axios.put(`http://localhost:8080/addReaction/${id}`, {
        comment: comment,
        rating: rating,
      });

      setComments([...comments, response.data]);

      setComment('');
      setRating(0);

      toast.success('Comment and rating submitted successfully!', {
        position: "bottom-center",
        autoClose: 3000,
      });

    } catch (error) {
        // Swal.fire({
        //     icon: 'error',
        //     title: 'Failed',
        //     text: `${error.response.data}`,
        //   });
          window.location.href = 'http://localhost:3000/signin';
      console.error('Error submitting data: ', error);

      toast.error('Error submitting comment and rating. Please try again.', {
        position: "bottom-center",
        autoClose: 3000,
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-100  py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
          <div className="md:flex-1 px-4">
            <div className="h-[460px] rounded-lg bg-black mb-4">
              <img
                className="w-full h-full object-cover"
                src={product.img_url}
                alt="Product Image"
              />
            </div>
            <div className="flex -mx-2 mb-4">
              <div className="w-1/2 px-2">
                <button
                  className="w-full bg-gray-200  text-black py-2 px-4 rounded-full font-bold hover:bg-gray-300 "
                  onClick={() => { addToCart(product.product_id) }}
                >
                  Add to Cart
                </button>
              </div>
              <div className="w-1/2 px-2">
                <button
                  className="w-full bg-gray-200  text-gray-800  py-2 px-4 rounded-full font-bold hover:bg-gray-300 e"
                  onClick={() => { addToWishlist(product.product_id) }}
                >
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
          <div className="md:flex-1 px-4">
            <h2 className="text-2xl font-bold text-gray-800  mb-2">
              {product.product_name}
            </h2>
            <p className="text-gray-600  text-sm mb-4">
              {product.description}
            </p>
            <div className="mb-4">
              <span className="font-bold text-gray-700 ">
                Price: {product.price}
              </span>
            </div>
            <div className="mb-4">
              <span className="font-bold text-gray-700 ">
                Rating: {product.product_rating}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-800 ">
            Comments and Ratings
          </h3>
          {isSubmitting && <p>Sending comment and rating...</p>}
          {!isSubmitting && comments.length === 0 ? (
            <p>No comments yet.</p>
          ) : (
            <ul>
              {comments.map((comment, index) => (
                <li key={comments.reaction_id} className="mb-2">
                  <strong>{comment.user}:</strong> {comment.comment} (Rating: {comment.rating})
                </li>
              ))}
            </ul>
          )}

          <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-12">
              <label className="block text-gray-700 " htmlFor="comment">
                Comment:
              </label>
              <textarea
                id="comment"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="form-input mt-1 block w-full"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 " htmlFor="rating">
                Rating:
              </label>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`text-2xl cursor-pointer ${
                      star <= rating ? 'text-yellow-500' : 'text-gray-300'
                    }`}
                    onClick={() => setRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-full font-bold hover:bg-blue-600"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductDetails;
