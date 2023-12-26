
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 300px;
  height: 500px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.0);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
`;

const Image = styled.img`
  width: 100%;
  height: 70%;
  object-fit: cover;
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 5;
  left: 0;
  width: 100%;
  height: 30%;
  background: rgb(36, 49, 92);
  color: #fff;
  padding: 10px;
  box-sizing: border-box;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: background 0.3s ease;

  ${CardContainer}:hover & {
    transform: translateY(0);
  }
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.p`
  font-size: 14px;
  margin-top: 8px;
`;

const Price = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-top: 8px;
`;

const TopSalles = () => {
  const [getTopSalesData, setgetTopSalesData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/getTopSales')
      .then((response) => response.json())
      .then((data) => setgetTopSalesData(data.slice(0, 4)))
      .catch((error) => console.error('Error', error));
  }, []); 

  return (
    
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff' }}>
      <div className="mb-2"></div>
      <div className="w-2/3 mx-auto flex items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        <span className="px-4 font-extrabold text-4xl text-red-500  ">Top Salles</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      </div>
      <div className="mb-16"></div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {getTopSalesData.map((product, index) => (
          <CardContainer key={index}>
<Link to={`/product/${product.product_id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <Image src={product.img_url} alt={`Product ${index + 1}`} />
              <Overlay>
                <Title>{product.title}</Title>
                <Description>{product.description}</Description>
                <Price>${product.price}</Price>
              </Overlay>
            </Link>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default TopSalles;
