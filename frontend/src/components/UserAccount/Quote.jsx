import { useState } from "react";
import QuoteEdit from "./QuoteEdit";

function Quote() {
  // State variable to manage the editing state
  const [isEditing, setIsEditing] = useState(true);

  // Function to toggle the editing state
  const Edit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="relative isolate overflow-hidden lg:flex lg:gap-x-20 lg:pt-0">
      <div className="mx-auto max-w-7xl text-center lg:mx-0 lg:flex-auto lg:text-left">
        {!isEditing ? (
          // If isEditing is false, render the QuoteEdit component
          <QuoteEdit />
        ) : (
          <>
            <div className="lg:flex max-lg:block">
              {/* First quote section */}
              <div className="py-1.5">
                <h2 className="text-2xl font-bold tracking-tight">
                  Titre citation
                </h2>
                <h3 className="text-md font-bold tracking-tight">Auteur</h3>
                <p className="mt-6 text-lg leading-8">
                  Ac euismod vel sit maecenas id pellentesque eu sed
                  consectetur. Malesuada adipiscing sagittis vel nulla.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <a
                    href="#"
                    onClick={Edit} // Trigger the Edit function when the link is clicked
                    className="shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Éditer
                  </a>
                  <a
                    href="#"
                    className="shadow-md px-3.5 py-2.5 rounded-md text-sm font-semibold leading-6 hover:bg-gray-300"
                  >
                    Supprimer
                  </a>
                </div>
              </div>

              {/* Second quote section */}
              <div className="py-1.5">
                <h2 className="text-2xl font-bold tracking-tight">
                  Titre citation
                </h2>
                <h3 className="text-md font-bold tracking-tight">Auteur</h3>
                <p className="mt-6 text-lg leading-8">
                  Ac euismod vel sit maecenas id pellentesque eu sed
                  consectetur. Malesuada adipiscing sagittis vel nulla.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <a
                    href="#"
                    onClick={Edit} // Trigger the Edit function when the link is clicked
                    className="shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Éditer
                  </a>
                  <a
                    href="#"
                    className="shadow-2xl px-3.5 py-2.5 rounded-md text-sm font-semibold leading-6 hover:bg-gray-300"
                  >
                    Supprimer
                  </a>
                </div>
              </div>

              {/* Third quote section */}
              <div className="py-1.5">
                <h2 className="text-2xl font-bold tracking-tight">
                  Titre citation
                </h2>
                <h3 className="text-md font-bold tracking-tight">Auteur</h3>
                <p className="mt-6 text-lg leading-8">
                  Ac euismod vel sit maecenas id pellentesque eu sed
                  consectetur. Malesuada adipiscing sagittis vel nulla.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start ">
                  <a
                    href="#"
                    onClick={Edit} // Trigger the Edit function when the link is clicked
                    className="shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    Éditer
                  </a>
                  <a
                    href="#"
                    className="shadow-2xl px-3.5 py-2.5 rounded-md text-sm font-semibold leading-6 hover:bg-gray-300"
                  >
                    Supprimer
                  </a>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quote; // Export the Quote component as default
