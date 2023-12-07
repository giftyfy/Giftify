import React from 'react';

const Gallery = () => {
  return (
    <div className="container mx-auto mt-8">
      <div className="mb-32"></div>
      <div className="w-2/3 mx-auto flex items-center">
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
        <span className="px-4 font-extrabold text-4xl text-red-500  ">Top Rating</span>
        <div className="flex-grow border-t border-gray-300 dark:border-gray-700"></div>
      </div>   
      <div className="flex flex-wrap justify-center">
        <div className="w-full md:w-1/2 p-8">
          <img
            alt="gallery"
            className="block w-full h-auto rounded-lg object-cover object-center"
            src="https://www.giftbasketpros.com/images/gifts/b/985_350.jpg"
            style={{ maxHeight: '500%', }} 
          />
        </div>

        {/* Smaller Images */}
        <div className="w-full md:w-1/2 flex flex-wrap">
          <div className="w-1/2 p-4">
            <img
              alt="gallery"
              className="block w-full h-auto rounded-lg object-cover object-center"
              src="https://jasminegift.com/wp-content/uploads/2023/01/%D8%A7%D8%B1%D8%B3%D9%84-%D8%B2%D9%87%D9%88%D8%B1-%D8%B9%D9%8A%D8%AF-%D8%A7%D9%84%D8%AD%D8%A8-%D8%A7%D9%84%D9%89-%D8%B9%D9%85%D8%A7%D9%86-%D8%A7%D9%84%D8%A3%D8%B1%D8%AF%D9%86.jpg"
            />
          </div>
          <div className="w-1/2 p-4">
            <img
              alt="gallery"
              className="block w-full h-auto rounded-lg object-cover object-center"
              src="https://m.media-amazon.com/images/I/61tqSs4fPkL._AC_UF1000,1000_QL80_.jpg"
            />
          </div>
          <div className="w-1/2 p-4">
            <img
              alt="gallery"
              className="block w-full h-auto rounded-lg object-cover object-center"
              src="https://jasminegift.com/wp-content/uploads/2022/09/CH-GOOD-GIRL-with-orcihd-plant-send-plant-to-amman.jpg"
            />
          </div>
          <div className="w-1/2 p-4">
            <img
              alt="gallery"
              className="block w-full h-auto rounded-lg object-cover object-center"
              src="https://jasminegift.com/wp-content/uploads/2021/07/3c382119-4df3-40a9-8a33-f132b2500f52-1.jpg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
