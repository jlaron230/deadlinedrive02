import React, { useState } from "react";

const quotePerDays = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <div>
      {isLoggedIn ? (
        <div class=" p-4  flex flex-col items-center bg-amber-500 m-3 rounded-full">
          <p> Le premier Savoir est le savoir de mon ignorance : c’est le début de l’intelligence </p>
          <h3 class="font-semibold" > Socrates</h3>
          <p>Choissisez un thème différent</p>
        </div>
      ) : (
        <div>
          <div class=" p-4  flex flex-col items-center bg-amber-500 m-3 rounded-full">
            {/* <button onClick={handleLogin} class="font-semibold">Appuyer ici pour vous connecter ou vous inscrire</button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default quotePerDays;