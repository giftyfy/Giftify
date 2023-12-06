import React, { useState, useEffect } from 'react';
        import { Link } from 'react-router-dom';
        import axios from 'axios';
        
        const GiftCard = () => {
          const [data, setData] = useState([]);
          const [currentPage, setCurrentPage] = useState(1);
          const itemsPerPage = 6;
        
          useEffect(() => {
            const fetchData = async () => {
              try {
                const response = await axios.get(`http://localhost:8080/getproductscategory/1`);
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
            <div style={{ display: 'flex' }}>
              {/* Sidebar */}
              <div style={{ flex: '0 0 16%', backgroundColor: '#fff', borderRight: '3px solid #ccc', padding: '20px' }}>
                <ul style={{ listStyle: 'none', padding: 10, textAlign: 'center', marginTop:"120px", fontSize:'20px'}}>
                  <li style={{ marginBottom: '30px' }}>
                    <Link to="/birthdaycard">Birthday</Link>
                  </li>
                  <li style={{ marginBottom: '30px' }}>
                    <Link to="/christmascard">Christmas</Link>
                  </li>
                  <li style={{ marginBottom: '30px' }}>
                    <Link to="/wintercard">Winter</Link>
                  </li>
                  <li style={{ marginBottom: '30px' }}>
                    <Link to="/weddingcard">Wedding</Link>
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
          );
        };
        
        export default GiftCard;
        