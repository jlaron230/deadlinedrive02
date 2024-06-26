import axios from "axios";
import { useState, useEffect } from "react";

function Password() {
  const [isEditing, setIsEditing] = useState(false);  // Initial state should be false for viewing mode
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [passwords, setPasswords] = useState({newPassword: "", confirmPassword: "" });
  const [errorMessage, setErrorMessage] = useState("");
const userId= "80";

  const fetchUserData = async () => {
    // if (!token) {
    //   console.error('No token found');
    //   return;
    // }

    try {
      const token = localStorage.getItem('token');
      console.log(token, 'token')
      const response = await axios.get(`http://localhost:5000/users/${userId}` , {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setUser(response.data);
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
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/users/${userId}/password`, {...user, 
       
        newPassword: passwords} , 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setIsEditing(false);
      fetchUserData();
      setErrorMessage("");
    } catch (error) {
      console.error('Error updating password:', error);
      setErrorMessage("Erreur lors de la mise à jour du mot de passe");
    }
  };

  const Edit = () => {
    setIsEditing(!isEditing);
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);
console.log(user, "user")
  return (
    <>
      {user ? (
        <>
          {!isEditing ? (
            <div>
              <a
                href="#"
                onClick={Edit}
                className="mt-3 mb-4 inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Modifier le mot de passe
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
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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

export default Password;
