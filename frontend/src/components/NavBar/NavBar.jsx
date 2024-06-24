import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, BellIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/Logo-Deadlines.svg';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-butterscotch">
      <div className="max-w-7xl mx-auto p-2 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/">
            <img src={logo} alt="Logo" className="h-16 w-16 mr-2" />
            </Link>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link to="/deadlines" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Deadlines</Link>
                <Link to="/customize-quotes" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Personnaliser</Link>
                <Link to="/quote" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Citations</Link>
                <Link to="/favoris" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Favoris</Link>
                <Link to="/about" className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">À propos</Link>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button onClick={() => window.location.href = '/Contact'} className="text-custom-black hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </button>
            <div className="relative">
              <button className="text-custom-black hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405C18.82 14.982 19 14.512 19 14c0-1.373-.777-2.574-2-3.157m0 0C15.92 10.403 15 9.28 15 8c0-.732.195-1.414.537-2M17.5 6h.01M6.318 17a2.25 2.25 0 1 1-3.192 0M4.25 4.5a2.25 2.25 0 1 0-3.181 3.181M7.75 6h-.01M6 10.75a3.75 3.75 0 0 1 7.5 0v3.75m-7.5 0A3.75 3.75 0 0 0 13.5 14.5m0-3.75a3.75 3.75 0 0 1 7.5 0v3.75m0 0A3.75 3.75 0 0 0 20 14.5v-3.75m0 0A3.75 3.75 0 0 1 20 10.75V4.5a3.75 3.75 0 1 0-7.5 0v3.75a3.75 3.75 0 1 0-7.5 0v3.75c0 .732.195 1.414.537 2M15.75 17h1.5c.276 0 .526-.116.7-.302M20.25 10.75c0-.4.034-.794.1-1.181a2.25 2.25 0 0 1-2.1 1.431M19.5 4.5a2.25 2.25 0 0 1-1.5.5h-.01M6.318 17H8.25m0-6.75v7.5m0 0H15m0-7.5v7.5" />
                </svg>
              </button>
              <span className="absolute top-0 right-0 text-xs bg-red-500 text-custom-black rounded-full h-5 w-5 flex items-center justify-center">3</span>
            </div>
            <button onClick={() => window.location.href = '/UserAccount'} className="text-custom-black hover:text-gray-200">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-4.28 0-7.5 3.22-7.5 7.5a1 1 0 1 0 2 0C6.5 17.57 8.57 15.5 12 15.5s5.5 2.07 5.5 6a1 1 0 1 0 2 0C19.5 17.57 16.28 14 12 14zM12 2C7.82 2 4.5 5.32 4.5 9.5S7.82 17 12 17s7.5-3.32 7.5-7.5S16.18 2 12 2zM12 5c2.48 0 4.5 2.02 4.5 4.5S14.48 14 12 14 7.5 11.98 7.5 9.5 9.52 5 12 5z" />
              </svg>
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button onClick={toggleMenu} className="text-custom-black hover:text-gray-200 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link to="/about" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium">À propos</Link>
          <Link to="/deadlines" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium">Deadlines</Link>
          <Link to="/customize-quotes" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium">Créer Citation</Link>
          <Link to="/quote" className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium">Citations</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
