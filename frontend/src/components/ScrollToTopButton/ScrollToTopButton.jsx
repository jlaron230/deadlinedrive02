import React, { useState, useEffect } from 'react';
import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToTop}
            aria-label="Retour en haut de page"
            className={`fixed bottom-4 right-4 z-50 bg-butterscotch hover:bg-caramel text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition ease-in-out duration-300 ${isVisible ? 'block' : 'hidden'}`}
        >
            <ChevronDoubleUpIcon className="h-6 w-6" />
            <span className="tooltip-text absolute bg-black text-white text-xs rounded p-2 shadow-lg transition-opacity duration-300 opacity-0 group-hover:opacity-100 -translate-y-full -translate-x-1/2 sm:translate-x-0">
                Haut de page
            </span>
        </button>
    );
};

export default ScrollToTopButton;
