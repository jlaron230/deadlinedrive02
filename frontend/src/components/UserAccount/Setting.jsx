import { useState } from "react";
import SettingsModification from "./SettingsModification";
import Button from "./Button";

function Setting() {
  // State variable to manage the editing state
  const [isEditing, setIsEditing] = useState(true);

  // Function to toggle the editing state
  const Edit = () => {
    setIsEditing(!isEditing);
  };
  
  return (
    <div>
      {isEditing ? (
        <>
          {/* Button to trigger the editing mode */}
          <div className="flex max-lg:justify-center">
            <Button edit={Edit} />
          </div>
          <div className="flex max-lg:justify-center">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 gap-8 flex flex-wrap">
              <div>
                <dd className="text-sm font-medium leading-6 text-gray-900">
                  Nom et prénom
                </dd>
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  Denis
                </dt>
              </div>
              <div>
                <dd className=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Adresse email
                </dd>
                <dt className=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Adressemail@mail.com
                </dt>
              </div>
              <div>
                <dd className=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Date de naissance
                </dd>
                <dt className=" text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  11/12/2023
                </dt>
              </div>
            </div>
          </div>
        </>
      ) : (
        // If isEditing is false, render the SettingsModification component
        <SettingsModification />
      )}
    </div>
  );
}

export default Setting; // Export the Setting component as default