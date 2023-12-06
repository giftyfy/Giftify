import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Chrestmaspackge = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getproductsType/birthday`);
        setData(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchData();
  }, []);

  const currentItems = data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
    <nav
        className="flex px-5 py-5 text-gray-900  ml-60 z-[-1] "
        aria-label="Breadcrumb"
      >
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <Link
              to="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600  "
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <Link
                to="/giftsPackge"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
              >
                Packages Gifts
              </Link>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400">
                Christmas
              </span>
            </div>
          </li>
        </ol>
      </nav>
        
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ flex: '0 0 16%', backgroundColor: '#fff', borderRight: '3px solid #ccc', padding: '20px' }}>
        <ul style={{ listStyle: 'none', padding: 10, textAlign: 'center', marginTop:"120px", fontSize:'20px'}}>
          <li style={{ marginBottom: '30px' }}>
            <Link to="/birthdaypackge">Birthday</Link>
          </li>
          <li style={{ marginBottom: '30px' }}>
            <Link to="/christmaspackge">Christmas</Link>
          </li>
          <li style={{ marginBottom: '30px' }}>
            <Link to="/winterpackge">Winter</Link>
          </li>
          <li style={{ marginBottom: '30px' }}>
            <Link to="/weddingpackge">Wedding</Link>
          </li>
        </ul>
      </div>

      {/* Content */}
      <div style={{ flex: '0 0 80%', padding: '20px' }}>
        {/* Cards */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          {currentItems.map((item) => (
            <div key={item.product_id} style={{ maxWidth: '18rem', marginBottom: '2rem' }}>
              <Link to={`/product/${item.product_id}`}>
                <img
                  style={{ width: '100%', height: 'auto', borderRadius: '1rem', cursor: 'pointer' }}
                  src={item.img_url} alt={item.product_name}
                />
              </Link>
              <div style={{ padding: '1rem', backgroundColor: '#fffff', borderRadius: '1rem', marginTop: '1rem' }}>
                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                  <p style={{ fontSize: '1.2rem', color: '#27283d', marginBottom: '0.5rem' }}>{item.product_name}</p>
                </Link>
                <p style={{ fontSize: '1rem', color: '#27283d' }}>{item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '20px' }}>
            <li>
              <a href="#" onClick={() => paginate(currentPage - 1)}>Previous</a>
            </li>
            {[1, 2, 3, 4, 5].map((number) => (
              <li key={number}>
                <a href="#" onClick={() => paginate(number)} style={{ textDecoration: 'none', color: currentPage === number ? '#007BFF' : '#000' }}>
                  {number}
                </a>
              </li>
            ))}
            <li>
              <a href="#" onClick={() => paginate(currentPage + 1)}>Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    </>
  );
};

export default Chrestmaspackge;
