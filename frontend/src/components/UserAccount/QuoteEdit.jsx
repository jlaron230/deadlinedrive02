import Quote from "./Quote";
import { useState } from 'react';

function QuoteEdit() {
  // State variable to manage the editing state
  const [isEditing, setIsEditing] = useState(true);

  // Function to toggle the editing state
  const Edit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="mx-auto max-w-7xl text-center lg:mx-0 lg:flex-auto lg:text-left">
      {isEditing ? (
        <>
          {/* Title input */}
          <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
            Titre de la citation
          </label>
          <div className="relative mb-7">
            <input
              type="text"
              placeholder="Titre"
              className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-2.5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
            />
          </div>
          
          {/* Author input */}
          <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
            Auteur
          </label>
          <div className="relative mb-7">
            <input
              type="text"
              placeholder="Auteur"
              className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-2.5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
            />
          </div>
          
          {/* Content input */}
          <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
            Contenu
          </label>
          <div className="relative mb-7">
            <textarea
              placeholder="Ma citation"
              className="w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 py-[10px] pr-3 pl-2.5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2"
            />
          </div>
          
          {/* Save button */}
          <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
            <a
              href="#"
              onClick={Edit} // Trigger the Edit function when the link is clicked
              className="shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Sauvegarder
            </a>
          </div>
        </>
      ) : (
        // If isEditing is false, render the Quote component
        <Quote />
      )}
    </div>
  );
}

export default QuoteEdit; // Export the QuoteEdit component as default
