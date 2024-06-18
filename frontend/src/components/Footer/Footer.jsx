import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-custom-main-orange text-center py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link to="/LegalNotice" className="text-custom-black hover:text-gray-200">
            Politique de confidentialité
          </Link>
          <span className="text-custom-black">
            Deadline Drive 2024@ Tous droits réservés.
          </span>
          <Link to="/PrivacyPolicy" className="text-custom-black hover:text-gray-200">
            Conditions d'utilisation
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;