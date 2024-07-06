import { useEffect, useState } from "react";

function ModalFavorites (){
    // Initialize the modal open state to false
 const [isModalOpen, setIsModalOpen] = useState(false);

// Function to toggle the modal open state
 const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };
    return (
      <div
        id="hs-basic-modal"
        className={`hs-overlay ${
        !isModalOpen ? "bg-gray-500 bg-opacity-70 hs-overlay-open:opacity-100 hs-overlay-open:duration-500" : "hidden"
        } size-full fixed top-0 start-0 z-[80] overflow-x-hidden transition-all overflow-y-auto pointer-events-none`}
      >
        {/* Modal content container */}
        <div className="bg-white flex justify-center rounded-lg max-w-5xl max-sm:w-6/12 max-md:w-4/12 md:w-3/12 p-6 border border-2 border-custom-main-orange ml-auto mr-auto mt-28">
          <div className="flex justify-end">
            <div className=" sm:w-full sm:mx-auto">
              <div className=" flex flex-col bg-white rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <div className="p-4 overflow-y-auto justify-center flex">
                  {/* Confirmation message */}
                  <p className="mt-1 text-gray-800 dark:text-neutral-400">
                    Vous avez atteint la limite du nombre de favoris
                  </p>
                </div>
                <div className="flex justify-center items-center gap-x-4 py-3 px-4 dark:border-neutral-700">
                  <a href="#">
                    <button
                      type="button"
                      onClick={handleOpenModal}
                      className="btn py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white"
                    >
                      Compris
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default ModalFavorites;