import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "./Button";

function FetchData({ userId }) {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });
  const [isEditing, setIsEditing] = useState(false);

  // Function to fetch user data from the API
  const fetchUserData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:5000/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  // Fetch user data when component mounts or userId changes
  useEffect(() => {
    fetchUserData();
  }, [userId]);

  // Function to handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Function to toggle editing mode
  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  // Function to save edited user data
  const handleSaveClick = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await axios.put(`http://localhost:5000/users/${userId}`, user, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsEditing(false); // Exit edit mode after successful save
      fetchUserData(); // Refetch user data to update the state
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

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
                <Button edit={handleSaveClick} text={"Sauvegarder"} />
              </div>
            )}
          </div>
          <div className="flex max-lg:justify-center">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0 gap-8 flex flex-wrap">
              <div>
                <dd className="text-sm font-medium leading-6 text-gray-900">Nom</dd>
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
                <dd className="text-sm font-medium leading-6 text-gray-900">Prénom</dd>
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
                <dd className="text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">Adresse email</dd>
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
