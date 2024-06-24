import axios from "axios";
import { useState, useEffect } from "react";

function Password({ userId }) {
  // State variable to manage the editing state
  const [isEditing, setIsEditing] = useState(false);  // Initial state should be false for viewing mode
  const [user, setUser] = useState(null);
  const [passwords, setPasswords] = useState({ newPassword: "", confirmPassword: "" });

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/users/11`);
      const userData = {
        password : response.data.password,
        id: response.data.id,
      };
      setUser(userData);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const handleSaveClick = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/users/11`, {password : passwords.newPassword}, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      setIsEditing(false);
      fetchUserData();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };


  // Function to toggle the editing state
  const Edit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]); // Call fetchUserData when userId changes

  return (
    <>
    {user ? (
      <>
    {!isEditing ? (
      <div>
        <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Mot de passe actuel
        </label>
        <input
          type="password"
          placeholder="Mot de passe actuel"
          disabled
          value={user.password}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none disabled:cursor-default disabled:bg-gray-2 disabled:border-gray-2 dark:disabled:bg-dark-4 dark:disabled:border-dark-4"
        />
        <a
          href="#"
          onClick={Edit}
          className="mt-3 mb-4 inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Modifier
        </a>
      </div>
    ) : (
      <div>
        <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Nouveau Mot de passe
        </label>
        <input
          type="password"
          name="newPassword"
          placeholder="Nouveau mot de passe"
          value={passwords.newPassword}
          onChange={handleInputChange}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
        />
        <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
          Confirmation du nouveau Mot de passe
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirmer le mot de passe"
          value={passwords.confirmPassword}
          onChange={handleInputChange}
          className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-5 text-dark-6 outline-none transition focus:border-primary active:border-primary"
        />
        <a
          href="#"
          onClick={handleSaveClick}
          className="mt-4 inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Sauvegarder
        </a>
      </div>
    )}
  </>
) : (
  <p>Loading...</p>
)}
</>
);
}

export default Password; // Export the Password component as default