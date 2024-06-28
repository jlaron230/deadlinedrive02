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
  const [showPassword, setShowPassword] = useState(false);
const userId = localStorage.getItem('id');

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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSaveClick = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas");
      return;
    } else if (passwords.newPassword.length <= 5) {
      setErrorMessage("Minimum de 6 caractères pour le mot de passe");
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
              <label className="mb-3 block text-base font-medium text-dark dark:text-white">
                Nouveau Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="newPassword"
                  placeholder="Nouveau mot de passe"
                  value={passwords.newPassword}
                  onChange={handleInputChange}
                  className="w-full rounded-md border border-stroke dark:border-dark-3 py-2 px-3 text-dark-6 outline-none transition focus:border-primary active:border-primary"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.928 8.072A9 9 0 0 1 20.5 12a9 9 0 1 1-17.856 2.072m-2.072-2.072a9 9 0 0 1 14.956-2.072M12 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.928 8.072A9 9 0 0 1 20.5 12a9 9 0 1 1-17.856 2.072m-2.072-2.072a9 9 0 0 1 14.956-2.072M12 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15s2-1 3-2-2-3-3-3-3 1-3 1"
                      />
                    </svg>
                  )}
                </div>
              </div>
            <label className="mb-[10px] block text-base font-medium text-dark dark:text-white">
              Confirmation du nouveau Mot de passe
            </label>
            <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirmer le mot de passe"
              value={passwords.confirmPassword}
              onChange={handleInputChange}
              className="w-full rounded-md border border-stroke dark:border-dark-3 py-[10px] px-3 text-dark-6 outline-none transition focus:border-primary active:border-primary"
            />
            <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                  onClick={handleTogglePassword}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.928 8.072A9 9 0 0 1 20.5 12a9 9 0 1 1-17.856 2.072m-2.072-2.072a9 9 0 0 1 14.956-2.072M12 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="h-6 w-6 text-gray-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.928 8.072A9 9 0 0 1 20.5 12a9 9 0 1 1-17.856 2.072m-2.072-2.072a9 9 0 0 1 14.956-2.072M12 17.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15s2-1 3-2-2-3-3-3-3 1-3 1"
                      />
                    </svg>
                  )}
                </div>
                </div>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <div className="mt-4">
              <button
                onClick={handleSaveClick}
                className="inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Sauvegarder
              </button>
              <button
                onClick={Edit}
                className="ml-2 inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Annuler
              </button>
            </div>
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
