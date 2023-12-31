// import './App.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import  NavBar  from './components/NavBar';
// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Home from './pages/Home';
// import Cart from './pages/Cart';
// import Profile from './pages/Profile';

// import Footer from './components/Footer';
// import GiftCategory from './Gift/GiftCategory';
// import BirthdayGift from '../src/Birthday/Birthday_gift/BirthdayGift';
// import WeddingGift from './Wedding/WeddingGift';
// import ChrestmasGift from './Christmas/ChrestmasGift';
// import WinterGift from './winter/WinterGift';
// import GiftPackge from './Gift/GiftPackge';

// import BirthdayPackge from '../src/Birthday/birthday_package/BirthdayPackge';
// import WeddingPackge from './Wedding/WeddingPackge';
// import ChrestmasPackge from './Christmas/ChrestmasPackge';
// import WinterPackge from './winter/WinterPackge';
// import Giftcake from './Gift/Giftcake';
// import Birthdaycake from '../src/Birthday/birthday_package/Birthdaycake';
// import Weddingcake from './Wedding/Weddingcake';
// import Chrestmascake from './Christmas/Chrestmascake';

// import Wintercake from './winter/Wintercake';
// import ProductDetails from '../src/Birthday/Birthday_gift/ProductDetails';
// import Checkout from './pages/Checkout';
// import Aboutus from './pages/Aboutus';
// import Contactus from './pages/Contactus';
// import GiftCard from './Gift/GiftCard';


// function App() {
//   return (
//     <BrowserRouter>
//       <NavBar />
//       <Routes>
//       <Route path='/' element={<Home />} />
//         <Route path='/signup' element={<SignUp />} />
//         <Route path='/signin' element={<SignIn />} />
//         <Route path='/gifts' element={<GiftCategory />} />
//         <Route path='/birthdaygifts' element={<BirthdayGift />} />
//         <Route path='/weddinggifts' element={<WeddingGift />} />
//         <Route path='/wintergifts' element={<WinterGift />} />
//         <Route path='/christmasgifts' element={<ChrestmasGift />} />
//         <Route path='/profile' element={<Profile />} />

//         <Route path='/checkout' element={<Checkout />} />
//         <Route path='/giftsPackge' element={<GiftPackge />} />
//         <Route path='/birthdayPackge' element={<BirthdayPackge />} />
//         <Route path='/weddingPackge' element={<WeddingPackge />} />
//         <Route path='/winterPackge' element={<WinterPackge />} />
//         <Route path='/christmasPackge' element={<ChrestmasPackge />} />
//         <Route path='/cart' element={<Cart />} />

//         <Route path='/giftscake' element={<Giftcake />} />
//         <Route path='/birthdaycake' element={<Birthdaycake />} />
//         <Route path='/weddingcake' element={<Weddingcake />} />
//         <Route path='/wintercake' element={<Wintercake />} />
//         <Route path='/christmascake' element={<Chrestmascake />} />
//         <Route path="/product/:id" element={<ProductDetails />} />
//         <Route path='/aboutus' element={<Aboutus/>}/>
//         <Route path='/contactus' element={<Contactus/>}/>
//         <Route path='/giftscard' element={<GiftCard />} />
//         {/* <Route path="/error404" component={NotFound} /> */}


        
//       </Routes>
//       <Footer />
//     </BrowserRouter>
//   );
// }

// export default App;

import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import  NavBar  from './components/NavBar';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Profile from './pages/Profile';

import Footer from './components/Footer';
import GiftCategory from './Gift/GiftCategory';
import BirthdayGift from '../src/Birthday/Birthday_gift/BirthdayGift';
import WeddingGift from './Wedding/WeddingGift';
import ChrestmasGift from './Christmas/ChrestmasGift';
import WinterGift from './winter/WinterGift';
import GiftPackge from './Gift/GiftPackge';

import BirthdayPackge from '../src/Birthday/birthday_package/BirthdayPackge';
import WeddingPackge from './Wedding/WeddingPackge';
import ChrestmasPackge from './Christmas/ChrestmasPackge';
import WinterPackge from './winter/WinterPackge';
import Giftcake from './Gift/Giftcake';
import Birthdaycake from '../src/Birthday/birthday_package/Birthdaycake';
import Weddingcake from './Wedding/Weddingcake';
import Chrestmascake from './Christmas/Chrestmascake';

import Wintercake from './winter/Wintercake';
import ProductDetails from '../src/Birthday/Birthday_gift/ProductDetails';
import Checkout from './pages/Checkout';
import Aboutus from './pages/Aboutus';
import Contactus from './pages/Contactus';
import GiftCard from './Gift/GiftCard';
import NotFound from './pages/NotFound';

function App() {
  const isAuthenticated = !!document.cookie.includes('accessToken');

  return (
<BrowserRouter>
          <NavBar />
      <Routes>
      {/* <Route path='*' element={<NotFoundPage />} /> */}
      <Route path='/' element={<Home />} />
       <Route path='/signup' element={<SignUp />} />
   <Route path='/signin' element={<SignIn />} />
     <Route path='/gifts' element={<GiftCategory />} />
      <Route path='/birthdaygifts' element={<BirthdayGift />} />
         <Route path='/weddinggifts' element={<WeddingGift />} />
   <Route path='/wintergifts' element={<WinterGift />} />
   <Route path='/christmasgifts' element={<ChrestmasGift />} />
   

       <Route path='/giftsPackge' element={<GiftPackge />} />
    <Route path='/birthdayPackge' element={<BirthdayPackge />} />
    <Route path='/weddingPackge' element={<WeddingPackge />} />
 <Route path='/winterPackge' element={<WinterPackge />} />
     <Route path='/christmasPackge' element={<ChrestmasPackge />} />

      <Route path='/giftscake' element={<Giftcake />} />
       <Route path='/birthdaycake' element={<Birthdaycake />} />
     <Route path='/weddingcake' element={<Weddingcake />} />
       <Route path='/wintercake' element={<Wintercake />} />
      <Route path='/christmascake' element={<Chrestmascake />} />
        <Route path="/product/:id" element={<ProductDetails />} />
   <Route path='/aboutus' element={<Aboutus/>}/>
       <Route path='/contactus' element={<Contactus/>}/>
    <Route path='/giftscard' element={<GiftCard />} />












        {isAuthenticated && (
          <>
            <Route path='/profile' element={<Profile />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/cart' element={<Cart />} />
          </>
        )}

        {!isAuthenticated && (
          <>
            <Route path='/signin' element={<SignIn />} />
            <Route path='/notFound' element={<NotFound />} />
          </>
        )}

        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
      </BrowserRouter>   );
}

export default App;
