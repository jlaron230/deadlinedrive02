import { useState, useEffect } from "react";
import Password from "./Password";
import Quote from "./Quote";
import FetchData from "./FetchData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  XMarkIcon,
} from "@heroicons/react/24/solid";

function UserAccountProps() {
  // State to manage the active tab and default to "general"
  const [activeTab, setActiveTab] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();

  // Function to handle tab clicks and update activeTab state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Function to open the deletion modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the deletion modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function for user logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // Function for account deletion
  const deleting = async () => {
    try {
      localStorage.clear();
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}`);
      navigate("/signup");
      console.log("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  // Redirect to login page if user is not logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <main className="flex items-center justify-center bg-gray-50 ">
      {/* Modal for account deletion confirmation */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} deletes={deleting} />

      <div className="flex flex-col w-full">
        {/* Header section */}

        {/* Main content section */}
        <div className="h-2/3 max-h-full max-lg:block lg:flex min-h-screen">

              {/* Sidebar section */}
              <div className="bg-neutral-100 flex flex-shrink-0 flex-col max-sm:block max-lg:flex-row lg:w-60 max-lg:justify-center p-6">
              {/* Tab links */}
              <a
                className={`max-sm:w-3/6 font-bold hover:shadow w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 focus:lien ${
                  activeTab === "general" ? "bg-slate-200 font-medium" : ""
                }`}
                onClick={() => handleTabClick("general")}
                href="#"
              >
                Général
              </a>
              <a
                className={`max-sm:w-3/6 font-bold hover:shadow w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 focus:lien ${
                  activeTab === "Citations" ? "bg-slate-200 font-medium" : ""
                }`}
                onClick={() => handleTabClick("Citations")}
                href="#"
              >
                Citations
              </a>
              <a
                className={`max-sm:w-3/6 font-bold hover:shadow w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:lien ${
                  activeTab === "Motdepasse" ? "bg-slate-200 font-medium" : ""
                }`}
                onClick={() => handleTabClick("Motdepasse")}
                href="#"
              >
                Mot de passe
              </a>
              <a
                className={`max-sm:w-3/6 font-bold hover:shadow w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 focus:bg-gray-100 focus:lien ${
                  activeTab === "Suppression" ? "bg-slate-200 font-medium" : ""
                }`}
                onClick={handleOpenModal}
                href="#"
              >
                Suppression du compte
              </a>
              <a
            className={`sm:w-full max-sm:w-full max-sm:mt-4 h-12 px-4 flex items-center justify-center hover:bg-gray-100 btn ${
              activeTab === "deconnexion" ? "bg-slate-200 font-bold" : ""
            }`}
            onClick={() => {
              handleTabClick("deconnexion");
              handleLogout();
            }}
            href="#"
          >
            Déconnexion
          </a>
            </div>
          {/* Content section based on activeTab */}
          <div className="py-3 lg:ml-6 m-8">
            {activeTab === "general" && (
              <>
                {/* Section for general settings */}
                <section className="dark:bg-dark">
                  <div className="gap-8 flex flex-wrap flex-col ">
                    <h1 className="text-5xl font-bold tracking-tight mb-5 text-center">
                    Informations personnelles
                    </h1>
                    {/* FetchData component for displaying user info */}
                    <FetchData />
                  </div>
                </section>
              </>
            )}
            {activeTab === "Citations" && (
              <>
                {/* Section for favorite quotes */}
                <section className="dark:bg-dark">
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight mb-5 max-lg:text-center">
                      Citations favorites
                    </h1>
                    {/* Quote component for managing favorite quotes */}
                    <Quote />
                  </div>
                </section>
              </>
            )}
            {activeTab === "Motdepasse" && (
              <>
                {/* Section for password management */}
                <section className="dark:bg-dark">
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight mb-5 text-center">
                      Mot de passe
                    </h1>
                    <div className=" flex justify-center flex-wrap">
                      {/* Password component for managing password */}
                      <Password />
                    </div>
                  </div>
                </section>
              </>
            )}
            {activeTab === "Suppression" && (
              <>
                {/* Section for account deletion */}
                <section className="dark:bg-dark">
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight mb-5 text-center ">
                      Suppression du compte
                    </h1>
                    <div className="-mx-4 flex justify-center flex-wrap">
                      {/* Password component for confirming account deletion */}
                      <Password />
                    </div>
                  </div>
                </section>
              </>
            )}
          </div>
            </div>
      </div>
    </main>
  );
}

// Modal component for confirming account deletion
const Modal = ({ isOpen, onClose, deletes }) => {
  return (
    <div
      id="hs-basic-modal"
      className={`hs-overlay ${
        isOpen ? "bg-gray-500 bg-opacity-70 hs-overlay-open:opacity-100 hs-overlay-open:duration-500" : "hidden"
      } size-full fixed top-0 start-0 z-[80] overflow-x-hidden transition-all overflow-y-auto pointer-events-none`}
    >
      <div className="bg-white flex justify-center rounded-lg max-w-5xl max-sm:w-6/12 max-md:w-4/12 md:w-3/12 p-6 border border-2 border-custom-main-orange ml-auto mr-auto mt-28">
        <div className="flex justify-end">
          <div className=" sm:w-full sm:mx-auto">
            <div className=" flex flex-col bg-white rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
              <div className="flex justify-end items-center py-3 px-4 dark:border-neutral-700">
                {/* Close button */}
                <button type="button" onClick={onClose} className="text-white">
                  <XMarkIcon className="hover:bg-black bg-red-500 w-6 h-6" />
                </button>
              </div>
              <div className="p-4 overflow-y-auto justify-center flex">
                {/* Confirmation message */}
                <p className="mt-1 text-gray-800 dark:text-neutral-400">
                  Vous êtes sûr que c'est votre ultime bafouille ?!
                </p>
              </div>
              <div className="flex justify-center items-center gap-x-4 py-3 px-4 dark:border-neutral-700">
                {/* Close and Delete buttons */}
                <button
                  type="button"
                  className=" btn py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border-gray-200 bg-white text-gray-800 hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                  onClick={onClose}
                >
                  Annuler
                </button>
                <a href="#">
                  <button
                    type="button"
                    onClick={deletes}
                    className="btn py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-white"
                  >
                    Supprimer
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

export default UserAccountProps;

