import { useState, useEffect } from "react";
import Password from "./Password";
import Quote from "./Quote";
import FetchUser from "./FetchUser";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserAccountProps() {
  // State to manage the active tab and default to "general"
  const [activeTab, setActiveTab] = useState("general");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem('id');
  const navigate = useNavigate();  // Use useNavigate to obtain the navigate function

  // Function to handle tab clicks and update activeTab state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.clear(); // Supprimer le token JWT du localStorage
    navigate("/login");

    // Optionnel : Rediriger l'utilisateur vers la page de connexion ou une autre page après la déconnexion
    // history.push('/login');
  };

    // Redirect to login page if user is not logged in
    useEffect(() => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate("/login");
      }
    }, []);

  // Fonction de déconnexion
  const deleting = async () => {
    try {
      localStorage.clear(); // Supprimer le token JWT du localStorage

      navigate("/signup");
      await axios.delete(`http://localhost:5000/users/${userId}`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });
      // history.push('/login');
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6">
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} deletes={deleting} />
      <div className="flex flex-col w-full">
        {/* Header section */}
        <div className="flex items-center h-16 pl-10 pr-6 border-b border-gray-200">
          <span className="font-medium">Paramètres</span>

          <a
            className={`ml-auto h-12 px-4 flex items-center justify-center hover:bg-gray-100 ${
              activeTab === "deconnexion" ? "bg-gray-100 font-medium" : ""
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
        {/* Main content section */}
        <div className="h-2/3 max-h-full max-lg:block lg:flex min-h-screen">
          {/* Sidebar section */}
          <div className="flex flex-shrink-0 flex-col max-lg:flex-row lg:w-60 max-lg:justify-center p-6">
            {/* Tab links */}
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 focus:bg-gray-100 ${
                activeTab === "general" ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={() => handleTabClick("general")}
              href="#"
            >
              General
            </a>
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 focus:bg-gray-100 ${
                activeTab === "Citations" ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={() => handleTabClick("Citations")}
              href="#"
            >
              Citations
            </a>
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 focus:bg-gray-100 ${
                activeTab === "Motdepasse" ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={() => handleTabClick("Motdepasse")}
              href="#"
            >
              Mot de passe
            </a>
            <a
              className={`w-full flex items-center h-12 px-4 text-sm hover:bg-gray-100 focus:bg-gray-100 ${
                activeTab === "Suppression" ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={handleOpenModal}
              href="#"
            >
              Suppression
            </a>
          </div>

          {/* Content section based on activeTab */}
          <div className="py-3">
            {activeTab === "general" && (
              <>
                {/* Section for general settings */}
                <section className="dark:bg-dark">
                  <div className="gap-8 flex flex-wrap flex-col items-center">
                    <h1 className="text-5xl font-bold tracking-tight mb-5 text-center">
                      Informations personnelles
                    </h1>
                  </div>
                  {/* Conditional rendering based on editing state */}
                  <FetchUser />
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
                  </div>
                  <Quote />
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
                  </div>
                  <div className="-mx-4 flex justify-center flex-wrap">
                    <Password />
                  </div>
                </section>
              </>
            )}
            {activeTab === "Deconnexion" && (
              <>
                {/* Section for password management */}
                <section className="dark:bg-dark">
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight mb-5 text-center">
                      Déconnexion
                    </h1>
                  </div>
                  <div className="-mx-4 flex justify-center flex-wrap">
                    <Password />
                  </div>
                </section>
              </>
            )}
            {activeTab === "Suppression" && (
              <>
                {/* Section for account deletion */}
                <section className="dark:bg-dark">
                  <div>
                    <h1 className="text-5xl font-bold tracking-tight mb-5 text-center">
                      Suppression
                    </h1>
                  </div>
                  <div className="-mx-4 flex justify-center flex-wrap">
                    <Password />
                  </div>
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const Modal = ({ isOpen, onClose, deletes }) => {
  return (
    <div
      id="hs-basic-modal"
      className={`hs-overlay ${
        isOpen ? "hs-overlay-open:opacity-100 hs-overlay-open:duration-500" : "hidden"
      } size-full fixed top-0 start-0 z-[80] overflow-x-hidden transition-all overflow-y-auto pointer-events-none`}
    >
      <div className="sm:max-w-lg sm:w-full m-3 sm:mx-auto mt-12">
        <div className="flex flex-col bg-white border shadow-sm rounded-xl pointer-events-auto dark:bg-neutral-800 dark:border-neutral-700 dark:shadow-neutral-700/70">
          <div className="flex justify-end items-center py-3 px-4 border-b dark:border-neutral-700">
            <button
              type="button"
              className="flex justify-center items-center size-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <svg
                className="flex-shrink-0 size-4"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto justify-center flex">
            <p className="mt-1 text-gray-800 dark:text-neutral-400">
            C'est votre ultime bafouille ?
            </p>
          </div>
          <div className="flex justify-center items-center gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
            <button
              type="button"
              className="btn py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
              onClick={onClose}
            >
              Fermer
            </button>
            <a href="#">
            <button
              type="button"
              onClick={deletes}
              className="btn py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700"
            >
              Supprimer
            </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAccountProps;
