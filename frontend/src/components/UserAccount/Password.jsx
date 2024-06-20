import { useState } from "react";

function Password() {
  // State variable to manage the editing state
  const [isEditing, setIsEditing] = useState(true);

  // Function to toggle the editing state
  const Edit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <>
      {!isEditing ? (
        // If isEditing is false, render the form for changing the password
        <div>
          <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
            Nouveau Mot de passe
          </label>
          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
          />
          <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
            Confirmation du nouveau Mot de passe
          </label>
          <input
            type="password"
            placeholder="Confirmer le mot de passe"
            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
          />
          <a
            href="#"
            onClick={Edit} // Trigger the Edit function when the link is clicked
            className="mt-4 inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Sauvegarder
          </a>
        </div>
      ) : (
        // If isEditing is true, render the form to display the current password
        <div>
          <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
            Mot de passe actuel
          </label>
          <input
            type="password"
            placeholder="Mot de passe actuel"
            disabled // Disable the input field
            className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
          />
          <a
            href="#"
            onClick={Edit} // Trigger the Edit function when the link is clicked
            className="mt-3 mb-4 inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Modifier
          </a>
        </div>
      )}
    </>
  );
}

export default Password; // Export the Password component as default