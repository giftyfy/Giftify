import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Weddingcake = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRanges, setPriceRanges] = useState([]);
  const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
  const itemsPerRow = 3;
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getproductsType/Wedding`);
        setData(response.data);
      } catch (error) {
        console.error('Error', error);
      }
    };

    fetchData();
  }, []);

  const handleCheckboxChange = (range) => {
    const updatedRanges = priceRanges.includes(range)
      ? priceRanges.filter((selectedRange) => selectedRange !== range)
      : [...priceRanges, range];

    setPriceRanges(updatedRanges);
    setCurrentPage(1);
  };

  const isInRange = (price) => {
    if (priceRanges.length === 0) {
      return true;
    }

    return priceRanges.some((range) => {
      const [min, max] = range.split('-').map(Number);
      return price >= min && price <= max;
    });
  };

  const filteredData = data.filter((item) => isInRange(item.price));

  const currentItems = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {/* Hero Section */}
      <div
        className="text-left mt-2 bg-cover bg-center relative"
        style={{ backgroundImage: 'url("https://media.istockphoto.com/id/532180276/photo/cupcakes-with-sparklers.jpg?s=612x612&w=0&k=20&c=N4HhaqjRqdOvyTMD5o3MzREseJCN4CbnQEG2zKaOYS4=', height: '400px',backgroundAttachment : "fixed" }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 text-white flex flex-col justify-center items-center">
          <h2 className="text-5xl font-bold mb-4" style={{marginRight:"45%"}}> Sweet Surprises for Your Loved Ones</h2>

          <p className="text-xl font-bold text-center " style={{marginRight:"50%"}}>
          Indulge in the joy of giving with our exquisite cake gifts.      <br/>
          Make every moment memorable, <br/>and let our gifts add a delightful touch to the celebrations <br/>
          Surprise your loved ones with these sweet moments that they will cherish forever.</p>
          </div>
          </div>
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
                        to="/giftscake"
                        className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 "
                      >
                       Gifts Cakes
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
                        Wedding
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
      {/* Sidebar */}
   
      <div style={{ display: 'flex' }}>
        
        <div style={{ flex: '0 0 15%', backgroundColor: '#fff', borderRight: '3px solid #ccc', padding: '0px', zIndex: '1' }}>
        <div style={{ margin: '30px 0', borderBottom: '1px solid #ccc', textAlign: 'center', padding: '00px' }}>
    Filter by Type
  </div>
          <ul style={{ listStyle: 'none', padding: 0, textAlign: 'center', marginTop: '20px', fontSize: '20px' }}>

          <li style={{ marginBottom: '30px' }}>
    <Link to="/birthdaycake">Birthday</Link>
  </li>
  <li style={{ marginBottom: '30px' }}>
    <Link to="/christmascake">Christmas</Link>
  </li>
  <li style={{ marginBottom: '30px' }}>
    <Link to="/wintercake">Winter</Link>
  </li>
  <li style={{ marginBottom: '30px' }}>
    <Link to="/weddingcake">Wedding</Link>
  </li>
</ul>
<div>
<div>

  
  <div style={{ margin: '20px 0', borderBottom: '1px solid #ccc', textAlign: 'center', padding: '10px',alignContent:'center'}}>
    Filter by Price
  </div>
  <label className="block text-sm font-medium text-gray-700">
  Price Range
</label>

<div className="mt-2 space-y-2">  
  <div className="flex flex-col">
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-6 w-4 text-indigo-600 transition duration-150 ease"
        onChange={() => handleCheckboxChange('0-50')}
        checked={priceRanges.includes('0-50')}
      />
      <span className="ml-2 text-l">0-50$</span>
    </label>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-6 w-4 text-indigo-600 transition duration-150 ease-in-out"
        onChange={() => handleCheckboxChange('51-100')}
        checked={priceRanges.includes('51-100')}
      />
      <span className="ml-2 text-l">51-100$</span>
    </label>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-6 w-4 text-indigo-600 transition duration-150 ease-in-out"
        onChange={() => handleCheckboxChange('101-200')}
        checked={priceRanges.includes('101-200')}
      />
      <span className="ml-2 text-l">101-200$</span>
    </label>
    <label className="inline-flex items-center">
      <input
        type="checkbox"
        className="form-checkbox h-6 w-4 text-indigo-600 transition duration-150 ease-in-out"
        onChange={() => handleCheckboxChange('>200')}
        checked={priceRanges.includes('>200')}
      />
      <span className="ml-2 text-l">+200$</span>
    </label>
  </div>

  </div>
</div>
        </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: '0 0 70%', marginLeft:'90px', padding: '20px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
          {currentItems.map((item) => (
            <div key={item.product_id} className="group border-gray-100/30 flex flex-col self-center overflow-hidden rounded-lg border bg-white shadow-md">
              <Link to={`/product/${item.product_id}`}>
                <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
                  <img className="peer absolute top-0 right-0 h-full w-full object-cover" src={item.img_url} alt={item.product_name} />
                  <img className="peer peer-hover:right-0 absolute top-0 -right-96 h-full w-full object-cover transition-all delay-100 duration-1000 hover:right-0" src={item.img_url} alt={item.product_name} />
                </div>
              </Link>
              <div className="mt-4 px-5 pb-5 flex-grow">
                <a href="#">
                  <h5 className="text-l font-bold tracking-tight text-gray">{item.product_name}</h5>
                </a>
                <p className={`text-xs text-gray ${isDescriptionExpanded ? 'block' : 'h-20 overflow-hidden'}`}>
                  {item.description}
                </p>
                <button onClick={() => setDescriptionExpanded(!isDescriptionExpanded)} className="text-sm text-blue-500">
                  {isDescriptionExpanded ? 'Read less' : 'Read more'}
                </button>
                <div className="mt-2 mb-5 flex items-center justify-between">
                  <p>
                    <span className="text-xl font-bold text-gray">{item.price}</span>
                  </p>
                </div>
                <a href="#" className="hover:border-white/40 flex items-center justify-center rounded-md border border-transparent bg-indigo-900 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300">
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Add to cart
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <nav aria-label="Page navigation example">
          <ul style={{ display: 'flex', gap: '10px' }}>
            <li>
              <a href="#" onClick={() => paginate(currentPage - 1)}>
                Previous
              </a>
            </li>
            {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, index) => (
              <li key={index}>
                <a href="#" onClick={() => paginate(index + 1)} style={{ textDecoration: 'none', color: currentPage === index + 1 ? '#007BFF' : '#000' }}>
                  {index + 1}
                </a>
              </li>
            ))}
            <li>
              <a href="#" onClick={() => paginate(currentPage + 1)}>
                Next
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Weddingcake;
