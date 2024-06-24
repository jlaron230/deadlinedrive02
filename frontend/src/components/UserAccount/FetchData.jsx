import User from "@components/User/User";
import axios from "axios";
import { useState, useEffect } from "react";
import Button from "./Button";

function FetchData({ userId, email, name, birthday }) {
  const [user, setUser] = useState(null);
    // State variable to manage the editing state
    const [isEditing, setIsEditing] = useState(false);

    // Function to toggle the editing state
    const Edit = () => {
      setIsEditing(!isEditing);
    };
    

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`);
      const userData = {
        firstName: response.data.firstName,
        lastName: response.data.lastName,
        email: response.data.email,
        birthday: response.data.birthday,
        id: response.data.id,
      };
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/users/${userId}`, user, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setIsEditing(false);
      fetchUserData(); // Refresh the user data
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]); // Call fetchUserData when userId changes

  return (
    <div>
      {user ? (
        <div>
          <div className="flex flex-wrap max-lg:justify-center gap-3">
          <div className="flex max-lg:justify-center">
            <Button edit={handleEditClick} text={isEditing ? "Annuler" : "Éditer"} />
          </div>
          {isEditing && (
            <div className="flex max-lg:justify-center">
              <div className="flex max-lg:justify-center">
            <Button edit={handleSaveClick} text={"Sauvegarder"} />
          </div>
            </div>
          )}
          </div>
          <div className="flex max-lg:justify-center">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 gap-8 flex flex-wrap">
              <div>
                <dd className="text-sm font-medium leading-6 text-gray-900">
                  Nom
                </dd>
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleInputChange}
                       className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                    />
                  ) : (
                    `${user.firstName}`
                  )}
                </dt>
              </div>
              <div>
                <dd className="text-sm font-medium leading-6 text-gray-900">
                  Prénom
                </dd>
                <dt className="text-sm font-medium leading-6 text-gray-900">
                  {isEditing ? (
                    <input
                      type="text"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleInputChange}
                       className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                    />
                  ) : (
                    `${user.lastName}`
                  )}
                </dt>
              </div>
              <div>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Adresse email
                </dd>
                <dt className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleInputChange}
                       className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                    />
                  ) : (
                    user.email
                  )}
                </dt>
              </div>
              <div>
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  Date de naissance
                </dd>
                <dt className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {isEditing ? (
                    <input
                      type="date"
                      name="birthday"
                      value={user.birthday}
                      onChange={handleInputChange}
                       className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                    />
                  ) : (
                    user.birthday
                  )}
                </dt>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default FetchData;