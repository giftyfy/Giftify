import React, { useState, useEffect } from 'react';

const YourComponent = () => {
  const [position, setPosition] = useState(3);

  const imagePaths = [
    'https://cdn.pixabay.com/photo/2020/12/08/17/08/gifts-5815004_1280.jpg',
    'https://images.pexels.com/photos/13263947/pexels-photo-13263947.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://img.ehowcdn.com/375/cme-data/getty/befb009612ff4749b416e458c4487424.jpg',
    'https://cdn.pixabay.com/photo/2023/11/13/19/45/flowers-8386311_1280.png',
    'https://cdn.pixabay.com/photo/2021/11/29/15/01/christmas-6832802_1280.jpg',
    'https://cdn.pixabay.com/photo/2022/12/18/15/28/christmas-7663699_1280.jpg',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3uc-FDFd3_cWo7xvfXv8DsL_o5TZbCHzWgQaVMfMMEOfa9RDJGq6upaslU6c6jx2VLQM&usqp=CAU',
  ];

  const textArray = [
    'The Perfect Gift Awaits You!',
    'Amaze Your Loved Ones with Giftyfy Gifts',
    'Best Gifts at Irresistible Prices',
    'Discover the Beauty of Gifting with Giftyfy',
    'Choose the Ideal Gift with Our Site',
    'Luxurious Gifting Experience with Giftyfy',
    'Fast Delivery and Exceptional Service',
  ];

  const borderColors = ['#001f3f', '#0074cc', '#00aaff', '#003366', '#006699'];

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((prevPosition) => (prevPosition % 5) + 1);
    }, 5280);

    return () => {
      clearInterval(interval);
    };
  }, [position]);

  const handleRadioChange = (newPosition) => {
    setPosition(newPosition);
  };

  return (
    <div style={{ position: 'relative' }}>
      <style>
        {`
          input[type="radio"] {
            position: absolute;
            bottom: 5px;
            transform: translateX(-50%);
            margin: 0 2vw;
            appearance: none;
            width: 12px;
            height: 12px;
            background-color: #001f3f; /* Dark blue color */
            border: 2px solid #001f3f; /* Dark blue border */
            border-radius: 50%;
          }

          input[type="radio"]:not(:checked) {
            background-color: #001f3f; /* Dark blue color */
            border: 2px solid #001f3f; /* Dark blue border */
            border-radius: 50%;
          }

          input[type="radio"]:checked {
            background-color: #00264d; /* Darker shade of blue */
            border: 2px solid white; /* White border when checked */
            border-radius: 50%;
          }

          input[type="radio"]::before {
            content: '';
            display: block;
            width: 2px;
            height: 2px;
            margin: 3px;
            border-radius: 50%;
            background-color: #001f3f; /* Dark blue color */
            transition: background-color 0.3s ease;
          }

          input[type="radio"]:checked::before {
            background-color: #00264d; /* Darker shade of blue when checked */
          }
        `}
      </style>
      <main
        id="carousel"
        style={{
          width: '100vw',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          transformStyle: 'preserve-1d',
          perspective: '600px',
          '--position': position,
        }}
      >
        {imagePaths.map((path, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              width: '600px',
              height: '400px',
              backgroundSize: 'cover',
              backgroundImage: `url(${path})`,
              transform: `rotateY(${-10 * (position - index)}deg) translateX(${-300 * (position - index)}px)`,
              zIndex: position - Math.abs(position - index),
              transition: 'all 0.25s linear',
              borderRadius: '10px',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white',
              }}
            >
              <p style={{ fontSize: '24px' }}>{textArray[index]}</p>
            </div>
          </div>
        ))}
      </main>
      {[1, 2, 3, 4, 5].map((index) => (
        <input
          key={index}
          type="radio"
          name="position"
          checked={position === index}
          onChange={() => handleRadioChange(index)}
          style={{
            margin: '0 2vw',
            position: 'absolute',
            bottom: '5px',
            left: `${36 + 4 * index}%`,
            transform: 'translateX(-50%)',
          }}
        />
      ))}
    </div>
  );
};

export default YourComponent;
