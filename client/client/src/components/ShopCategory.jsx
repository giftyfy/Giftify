import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const ShopCategory = () => {
  useEffect(() => {
    AOS.init({
      duration: 1500,
      easing: 'ease-in',
      once: false,
    });
  }, []);

  const handleImageClick = (imageUrl) => {
    console.log('Clicked on image with URL:', imageUrl);
  };

  return (
    <section data-aos="fade-up" className="container mx-auto mt-8">
      <div className="mb-32"></div>
      <div className="w-full mx-auto flex items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        <span className="px-4 font-extrabold text-4xl text-red-500">Shop By Category</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      </div>
      <div className="flex flex-wrap justify-center">
        {/* Large Images */}
        <div className="w-full md:w-1/2 p-4">
          <Link to="/giftspackge">
            <div className="relative">
              <img
                alt="gallery"
                className="block w-full h-auto rounded-lg object-cover object-center cursor-pointer mb-4"
                src="https://m.media-amazon.com/images/I/71xWx5djs6L.jpg"
                style={{ height: '610px', width: '402px', marginLeft: '-150px', marginTop: '30px', opacity: 0.9 }}
                data-aos="fade-up"
                onClick={() =>
                  handleImageClick(
                    'https://i0.wp.com/fun-squared.com/wp-content/uploads/2016/10/HotChocolateGiftBasket.jpg?resize=650%2C916&ssl=1'
                  )
                }
              />
          <h1
      className="absolute bottom-0 left-0 text-white font-bold p-8"
      style={{
        position: 'absolute',
        bottom: 0,
        left: -150,
        width: '85%',
        fontFamily:"cursive",
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        zIndex: 5,
        borderRadius: '10px 10px 10px 10px', 
        fontSize: '40px',
        fontWeight: 'bold',
        justifyContent: 'center',
      }}
    >
      Packages
    </h1>
            </div>
          </Link>
          <Link to="/gifts">
  <div className="relative">
    <img
      alt="gallery"
      className="block w-full h-auto rounded-lg object-cover object-center cursor-pointer mb-4"
      src="https://i.etsystatic.com/36278622/r/il/cd6225/5380705024/il_fullxfull.5380705024_4z3z.jpg"
      style={{ height: '610px', width: '402px', marginLeft: '720px', marginTop: '-620px', opacity: 0.8 }}
      data-aos="fade-up"
      onClick={() =>
        handleImageClick('https://i.etsystatic.com/36278622/r/il/cd6225/5380705024/il_fullxfull.5380705024_4z3z.jpg')
      }
    />
    <h1
      className="absolute bottom-0 left-0 text-white font-bold p-8"
      style={{
        position: 'absolute',
        bottom: 0,
        left: 720,
        width: '85%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        zIndex: 5,
        borderRadius: '10px 10px 10px 10px', 
        fontSize: '40px', 
        fontWeight: 'bold',
        fontFamily:"cursive",
        justifyContent: 'center', 
      }}
    >
      Gifts
    </h1>
  </div>
</Link>
</div>

        {/* Small Images */}
        <div className="w-full md:w-1/2 flex flex-wrap">
          <div className="w-full md:w-1/2 p-4">
            <Link to="/giftscake">
              <div className="relative">
                <img
                  alt="gallery"
                  className="block w-full h-auto rounded-lg object-cover object-center cursor-pointer mb-4"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwSuIjEx8PI5ILnwjZ-O8eVHye8OiKT5OOtbLAXv-DB7xbQxVBa9rLJbxOxQ_OtHyui2g&usqp=CAU"
                  style={{
                    transform: 'scale(1.4)',
                    height: '200px',
                    width: '500px',
                    marginLeft: '-120px',
                    fontFamily:"cursive",
                    marginTop: '90px',
                    opacity: 1.0,
                  }}
                  data-aos="fade-up"
                  onClick={() =>
                    handleImageClick(
                      'https://images.nightcafe.studio/jobs/yodxx6Mf2PxwnFfe5wC3/yodxx6Mf2PxwnFfe5wC3--1--2r7d2_4x.jpg?tr=w-1600,c-at_max'
                    )
                  }
                />
               <h1
      className="absolute bottom-0 left-0 text-white font-bold p-8"
      style={{
        position: 'absolute',
        bottom: -40,
        left: -165,
        width: '140%',
        height: '140%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        zIndex: 5,
        fontFamily:"cursive",
        borderRadius: '10px 10px 10px 10px', 
        fontSize: '40px', 
        fontWeight: 'bold',
        justifyContent: 'center',
      }}
    >
      Cakes
    </h1>
              </div>
            </Link>
          </div>


          <div className="w-full md:w-1/2 p-4">
          <Link to="/giftscard">
              <div className="relative">
                <img
                  alt="gallery"
                  className="block w-full h-auto rounded-lg object-cover object-center cursor-pointer mb-4"
                src="https://cdn.joigifts.com/cache/896/0/joigifts/catalog/product/s/e/set_of_10_hubb_greeting_cards_with_envelopes_by_silsal-1.jpg"
                style={{
                  transform: 'scale(1.4)',
                  height: '200px',
                  width: '500px',
                  marginLeft: '-374px',
                  marginTop: '390px',
                  opacity: 1,
                }}
                  data-aos="fade-up"
                  onClick={() =>
                    handleImageClick(
                      'https://images.nightcafe.studio/jobs/yodxx6Mf2PxwnFfe5wC3/yodxx6Mf2PxwnFfe5wC3--1--2r7d2_4x.jpg?tr=w-1600,c-at_max'
                    )
                  }
                />
             <h1
      className="absolute bottom-0 left-0 text-white font-bold p-8"
      style={{
        position: 'absolute',
        bottom: -40,
        left: -420,
        width: '140%',
        height: '140%',fontFamily:"cursive",
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        zIndex: 5,
        borderRadius: '10px 10px 10px 10px', 
        fontSize: '40px', 
        fontWeight: 'bold',
        justifyContent: 'center', 
      }}
    >
      Card
    </h1>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopCategory;
