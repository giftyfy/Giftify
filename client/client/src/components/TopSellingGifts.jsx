import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const TopSelling = () => {
  const images = [
    'https://www.gosupps.com/media/catalog/product/8/1/81nQXzrH40L.jpg',
    'https://alexandriagiftbaskets.ca/cdn/shop/products/L3A4591_300x300.jpg?v=1668967838',
    "https://m.media-amazon.com/images/I/614AuRRn8NL._AC_UF894,1000_QL80_.jpg",
    'https://www.bigsmall.in/cdn/shop/files/ezgif.com-video-to-gif_6.gif?format=jpg&v=1686209554&width=1080',
    'https://m.media-amazon.com/images/I/81t0nrF5M2L._AC_UF894,1000_QL80_.jpg',
    'https://www.bloominggifts.co.za/wp-content/uploads/2022/11/154544.png',
    'https://www.gosupps.com/media/catalog/product/8/1/81nQXzrH40L.jpg',
    'https://alexandriagiftbaskets.ca/cdn/shop/products/L3A4591_300x300.jpg?v=1668967838',


  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#ffffff', padding: '20px' }}>
        <div className="mb-16"></div>
        <div className="w-2/3 mx-auto flex items-center">
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
          <span className="px-4 font-extrabold text-4xl text-red-500">New Collection</span>
          <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        </div>
        <div className="mb-16"></div>
        <div style={{ maxWidth: '90%', position: 'relative' }}>
          <Slider {...settings}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  style={{
                    width: '100%',
                    height: 'auto',
                    padding: '25px',
                    borderRadius: '15px',
                  }}
                />
              </div>
            ))}
          </Slider>
          <div
            style={{
              position: 'absolute',
              top: '80%',
              transform: 'translateY(-50%)',
              left: '0px',
              cursor: 'pointer',
              zIndex: '1',
            }}
            onClick={goToPrevSlide}
          >
          </div>
          <div
            style={{
              position: 'absolute',
              top: '80%',
              transform: 'translateY(-50%)',
              right: '0px',
              cursor: 'pointer',
              zIndex: '1',
            }}
            onClick={goToNextSlide}
          >
          </div>
        </div>
      </div>
    );
};

export default TopSelling;
