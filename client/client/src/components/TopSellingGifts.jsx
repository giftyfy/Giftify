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
    'https://www.bloominggifts.co.za/wp-content/uploads/2022/11/154544.png'
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ fontSize: '4em', textAlign: 'center', marginBottom: '10px', fontWeight: 'bold' }}>New Colletion</h2>
      <div style={{ maxWidth: '90%' }}>
        <Slider {...settings}>
          {images.map((image, index) => (
            <div key={index}>
              <img
                src={image}
                alt={`Slide ${index + 8}`}
                style={{
                  width: '100%',
                  height: 'auto',
                  padding: '25px',
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default TopSelling;
