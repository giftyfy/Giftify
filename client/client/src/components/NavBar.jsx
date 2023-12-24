import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart, faHome, faGift, faGifts, faBirthdayCake, faIdCard } from '@fortawesome/free-solid-svg-icons';
import logo from '../assets/logo.jpg';
import { useUser } from '../hooks/LoggedIn';
import { getCookie, removeCookie } from '../utils/cookieUtils';

const NavBar = () => {
  const location = useLocation();
  const LoggedIn = useUser();
  const [accessToken, setAccessToken] = useState(getCookie('accessToken'));
  const [hasAccessToken, setHasAccessToken] = useState(Boolean(accessToken));
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const storedToken = getCookie('accessToken');
    setHasAccessToken(Boolean(storedToken));
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

  const logout = () => {
    setAccessToken(null);
    removeCookie('accessToken');
    window.location.href = '/';
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#fff] border-gray-200 sticky top-0 z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <img src={logo} className="w-[6rem] self-center whitespace-nowrap" />

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="inline-flex items-center p-2 mt-4 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-cta"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        <div className={`items-center w-full md:flex md:w-auto md:order-1 ${isMenuOpen ? 'block' : 'hidden'}`} id="navbar-cta">
          <ul className="flex flex-col font-medium text-sm p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-4 md:mt-0 md:border-0 md:bg-[fff] dark:bg-white md:dark:white dark:border-gray-700">
            <li>
              <Link to='/' className={`block py-2 pl-3 mt-2 text-[#24315c] hover:underline rounded ${location.pathname === '/' ? 'underline' : ''}`}>
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                HOME
              </Link>
            </li>
            <li>
              <Link to='/gifts' className={`block py-2 pl-3 mt-2 text-[#24315c] hover:underline rounded ${location.pathname === '/gifts' ? 'underline' : ''}`}>
                <FontAwesomeIcon icon={faGift} className="mr-2" />
                Gifts
              </Link>
            </li>
            <li>
              <Link to='/giftsPackge' className={`block py-2 pl-3 mt-2 text-[#24315c] hover:underline rounded ${location.pathname === '/giftsPackge' ? 'underline' : ''}`}>
                <FontAwesomeIcon icon={faGifts} className="mr-2" />
                Packages
              </Link>
            </li>
            <li>
              <Link to='/giftscake' className={`block py-2 pl-3 mt-2 text-[#24315c] hover:underline rounded ${location.pathname === '/giftscake' ? 'underline' : ''}`}>
                <FontAwesomeIcon icon={faBirthdayCake} className="mr-2" />
                Cake & Sweet
              </Link>
            </li>
            <li>
              <Link to='/giftscard' className={`block py-2 pl-3 mt-2 text-[#24315c] hover:underline rounded ${location.pathname === '/giftscard' ? 'underline' : ''}`}>
                <FontAwesomeIcon icon={faIdCard} className="mr-2" />
                Card
              </Link>
            </li>
            {hasAccessToken ? (
              <>
                <li className="md:ml-auto">
                  <Link to='/cart' className={`block py-2 pl-3 pr-4 mt-2 text-[#24315c] hover:underline rounded ${location.pathname === '/cart' ? 'underline' : ''}`}>
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
                    Cart
                  </Link>
                </li>
                <li>
                  <Link to="/Profile" className={`block py-2 pl-3 mt-2 text-[#24315c] hover:underline rounded ${location.pathname === '/Profile' ? 'underline' : ''}`}>
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="block py-2 pl-1 mt-2 text-[#fff] hover:underline rounded border border-[#24315c] bg-[#24315c] focus:outline-none focus:ring focus:border-[#24315c]"
                  >
                    LOG OUT
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link to="/signin" className={`block py-2 pl-4 pl-3 mt-2 text-white bg-[#24315c] hover:bg-[#24315c] hover:text-[#fff] font-medium rounded-lg text-sm px-4 py-2 text-center md:mr-0`}>
                  SIGN IN/UP
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
