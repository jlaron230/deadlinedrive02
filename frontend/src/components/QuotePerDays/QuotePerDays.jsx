import React, { useState } from "react";

const quotePerDays = () => {
  // useState hook is used to manage the isLoggedIn state, which is initially set to false.
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle login, if the user is connected sets isLoggedIn to true.
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  // Function to handle logout, if the user is not connected sets isLoggedIn to false.
  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  // JSX to render the component.
  return (
    <div>
      {/* If the user is logged in, display the quote and author. */}
      {isLoggedIn ? (
        <div class="p-4 flex flex-col items-center  bg-custom-main-orange m-3 rounded-lg">
          <p>The first Knowledge is the knowledge of my ignorance: it is the beginning of intelligence</p>
          <h3 class="font-semibold">Socrates</h3>
          <p>Choose a different theme</p>
        </div>
      ) : (
        // If the user is not logged in, display the login prompt (commented out).
        <div>
           <div class="flex flex-col items-center">
            <button  class="font-semibold p-4  bg-custom-main-orange  rounded-lg">
              Appuyez ici pour vous connecter ou vous enregistrer !
            </button> 
        </div>
        </div>
      )}
    </div>
  );
};

export default quotePerDays;
