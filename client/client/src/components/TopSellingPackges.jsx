import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 300px;
  height: 400px;
  overflow: hidden;
  position: relative;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(255,255,255, 0.0);
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
  transition: 'background 0.3s ease', 

  ${CardContainer}:hover & {
    transform: translateY(0);
  }
`;

const Title = styled.span`
  font-size: 18px;
  font-weight: bold;
`;

const TopSellingPackage = () => {
  const categories = [
    {
      title: 'GIFTS',
      imageUrl: 'https://i.pinimg.com/736x/e5/56/10/e55610e25617aebe06330ef22111a341.jpg',
      link: '/gifts',
    },
    {
      title: 'PACKAGES',
      imageUrl: 'https://i.etsystatic.com/36278622/r/il/cd6225/5380705024/il_fullxfull.5380705024_4z3z.jpg',
      link: '/giftspackge',
    },
    {
      title: 'CAKES & SWEETS',
      imageUrl: 'https://images.nightcafe.studio/jobs/yodxx6Mf2PxwnFfe5wC3/yodxx6Mf2PxwnFfe5wC3--1--2r7d2_4x.jpg?tr=w-1600,c-at_max',
      link: '/giftscake',
    },
    {
      title: 'CARDS',
      imageUrl: 'https://cdn.joigifts.com/cache/896/0/joigifts/catalog/product/s/e/set_of_10_hubb_greeting_cards_with_envelopes_by_silsal-1.jpg',
      link: '/giftscard',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: '#ffffff', }}>
      <div className="mb-2"></div>
      <div className="w-2/3 mx-auto flex items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        <span className="px-4 font-extrabold text-4xl text-red-500  ">Shop By Category</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      </div>
      <div className="mb-16"></div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
        {categories.map((category, index) => (
          <CardContainer key={index}>
            <Link to={category.link} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
              <Image
                src={category.imageUrl}
                alt={`Category ${index + 1}`}
              />
              <Overlay>
                <Title>{category.title}</Title>
              </Overlay>
            </Link>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

export default TopSellingPackage;
