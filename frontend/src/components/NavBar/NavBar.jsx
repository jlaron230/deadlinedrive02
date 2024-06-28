import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon, BellIcon, EnvelopeIcon, UserIcon } from '@heroicons/react/24/outline';
import logo from '../../assets/Logo-Deadlines.svg';
import { motion } from 'framer-motion';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      transition: { duration: 0.3 },
    }
  };

  const menuVariants = {
    opened: {
      x: 0,
      opacity: 1,
      display: "block",
      transition: { duration: 0.5 }
    },
    closed: {
      x: "100%",
      opacity: 0,
      transitionEnd: {
        display: "none"
      },
      transition: { duration: 0.5 }
    }
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
                {['/deadlines', '/customize-quotes', '/quotes', '/about'].map((path, index) => (
                  <motion.div variants={linkVariants} whileHover="hover" key={index}>
                    <Link to={path} className="text-custom-black hover:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                      {['Deadlines', 'Personnaliser', 'Citations', 'À propos'][index]}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            {[
              { icon: <EnvelopeIcon className="h-7 w-7" />, href: '/contact' },
              { icon: <BellIcon className="h-7 w-7" />, href: '#' },
              { icon: <UserIcon className="h-7 w-7" />, href: '/user-account' }
            ].map((item, index) => (
              <motion.button whileHover="hover" onClick={() => window.location.href = item.href} className="text-custom-black hover:text-gray-200" key={index}>
                <motion.div variants={linkVariants}>
                  {item.icon}
                </motion.div>
              </motion.button>
            ))}
          </div>
          <div className="-mr-2 flex md:hidden">
            <motion.button onClick={toggleMenu} className="text-custom-black hover:text-gray-200 inline-flex items-center justify-center p-2 rounded-md focus:outline-none">
              <motion.div variants={linkVariants}>
                {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
      <motion.div
        variants={menuVariants}
        initial="closed"
        animate={isOpen ? "opened" : "closed"}
        className="md:hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {['/about', '/deadlines', '/customize-quotes', '/quotes'].map((path, index) => (
            <motion.div variants={linkVariants} whileHover="hover" key={index}>
              <Link to={path} className="text-custom-black hover:text-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                {['À propos', 'Deadlines', 'Créer Citation', 'Citations'][index]}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

export default NavBar;