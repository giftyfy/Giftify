import React from 'react';
import { Link } from 'react-router-dom';

import Hero from './Hero';
import HowDoesItWork from '../components/HowDoesItWork';
import GiftSection from '../components/GiftSection';
import TopSellingGifts from '../components/NewCollection';
import TopSellingPackges from '../components/TopRating';
import TopSellingCakes from '../components/ShopCategory';
import TopSellingCards from '../components/TopSalles';
import Aboutus from '../components/Aboutus';


const Home = () => {
  return (
    <div>
      <Hero />
      <div className="mb-16"></div>
      <div className="w-2/3 mx-auto flex items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        <span className="px-4 font-extrabold text-4xl text-red-500  ">How does it work</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      </div>
      <div className="mb-16"></div>
      <HowDoesItWork />
   
      <div className="w-2/3 mx-auto flex items-center mb-12">
      <TopSellingCakes />

        </div>

      <TopSellingGifts />
   
      
       <br/> <br/> <br/> 

        
      <TopSellingPackges />

  
      <br/> <br/> <br/> 



        <TopSellingCards />

     
      <div className="mb-32"></div>

<div style={{ backgroundColor: 'rgb(39, 40, 61)' }}>
  <GiftSection/>

</div>
<br/> <br/> <br/> 

      <div data-aos="fade-up">      <Aboutus />
</div>

        </div>
  );
};

export default Home;
