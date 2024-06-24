import { useState } from "react";
import Password from "./Password";
import Quote from "./Quote";
import Close from "./Close";
import FetchUser from "./FetchUser";

function UserAccountProps() {
  // State to manage the active tab and default to "general"
  const [activeTab, setActiveTab] = useState("general");

  // State to manage editing state
  const [isEditing, setIsEditing] = useState(true);

  // Function to handle tab clicks and update activeTab state
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex items-center justify-center bg-gray-50 p-6">
      <div className="flex flex-col w-full">
        {/* Header section */}
        <div className="flex items-center h-16 pl-10 pr-6 border-b border-gray-200">
          <span className="font-medium">Paramètres</span>
          <Close /> {/* Close button component */}
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserAccountProps;
