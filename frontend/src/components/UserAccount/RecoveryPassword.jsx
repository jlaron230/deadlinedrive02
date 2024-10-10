import axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

function RecoveryPassword() {
  const [isEditing, setIsEditing] = useState(false); // State to toggle edit mode
  const [passwords, setPasswords] = useState({
    newPassword: "",
    confirmPassword: "",
  }); // State to manage password inputs
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [IsTokenValid, setIsTokenValid] = useState([]); // State to
  const [isNewPassword, setIsNewPassword] = useState(false); 
  const [loading, setLoading] = useState(true);
  const location = useLocation()
  const token = new URLSearchParams(location.search).get("token");
  console.log("Token:", token);
  const userId = localStorage.getItem("id");
  const navigate = useNavigate();

  useEffect (() => {
    console.log(isNewPassword)
    if (!isNewPassword) {
   const verifyToken = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/password-recovery-page?token=${token}`,
      );
      console.log(response);
      setIsTokenValid(response.data.valid);
    }
    catch (error) {
      console.error("Error verifying token:", error.response ? error.response.data : error.message);
    }
     finally {
    setLoading(false); // Met à jour l'état de chargement une fois la vérification terminée
  }

}
console.log(token)
verifyToken()
  } else if (isNewPassword) {
    
    navigate("/login")
    console.log(isNewPassword)
  }
  
},[token])

 // change values of password
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

  const Edit = () => {
    setIsEditing(!isEditing); // Toggle edit mode
  };

  const handleSaveClick = async () => {
    if (passwords.newPassword !== passwords.confirmPassword) {
      setErrorMessage("Les mots de passe ne correspondent pas"); // Set error message if passwords do not match
      return;
    } else if (passwords.newPassword.length <= 5) {
      setErrorMessage("Minimum de 6 caractères pour le mot de passe"); // Set error message if password length is less than 6
      return;
    }

    try {
      await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/reset-password`, {
          token: token, // Token reçu par e-mail
          newPassword: passwords.newPassword, // Nouveau mot de passe
        });
      localStorage.clear();
      navigate("/login")
      setIsNewPassword(isNewPassword);
      // Redirection ou message de succès
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage("Erreur lors de la mise à jour du mot de passe");
    }
  };

  return (
    <>
      {loading ? ( // Check if user data is available
        <p>Loading...</p>
      ) : IsTokenValid ? (
        <div className="max-sm:min-h-[87.5vh] sm:min-h-[87.5vh] flex flex-col p-2 items-center justify-center">
            <div>
              <h1 className="text-4xl font-bold text-dark dark:text-white mb-8">
                Réinitialiser votre mot de passe</h1>
              <label className="mb-3 block text-base font-medium text-dark dark:text-white">
                Nouveau Mot de passe
              </label>
              <div className="relative mb-7">
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
                  {showPassword ? ( // Toggle eye icon for password visibility
               <EyeSlashIcon className="h-6 w-6" />
              ) : (
              <EyeIcon className="h-6 w-6" />
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
                  {showPassword ? ( // Toggle eye icon for password visibility
                 <EyeSlashIcon className="h-6 w-6" />
                  ) : (
                  <EyeIcon className="h-6 w-6" />
                  )}
                </div>
              </div>
              {errorMessage && <p className="text-red-500">{errorMessage}</p>}{" "}
              {/* Display error message if present */}
              <div className="mt-4">
                <button aria-label="Sauvegarder nouveau mot de passe"
                  onClick={handleSaveClick}
                  className="inline-block shadow-2xl rounded-md bg-black px-3.5 py-2.5 text-sm font-semibold text-white hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Sauvegarder
                </button>
              </div>
            </div>
            </div>
      ) : (
       <p>{errorMessage || "Le token est invalide."}</p>
     )}
    </>
  );
  // // return (
  // //   <>
  // //     {loading ? (
  // //       <p>Loading...</p>
  // //     ) : IsTokenValid ? (
  // //       <div>
  // //         <label>Nouveau Mot de passe</label>
  // //         <input
  // //           type={showPassword ? "text" : "password"}
  // //           name="newPassword"
  // //           placeholder="Nouveau mot de passe"
  // //           value={passwords.newPassword}
  // //           onChange={handleInputChange}
  // //         />
  // //         <label>Confirmation du nouveau Mot de passe</label>
  // //         <input
  // //           type={showPassword ? "text" : "password"}
  // //           name="confirmPassword"
  // //           placeholder="Confirmer le mot de passe"
  // //           value={passwords.confirmPassword}
  // //           onChange={handleInputChange}
  // //         />
  // //         {errorMessage && <p>{errorMessage}</p>}
  // //         <button onClick={handleSaveClick}>Sauvegarder</button>
  // //       </div>
  // //     ) : (
  // //       <p>{errorMessage || "Le token est invalide."}</p>
  // //     )}
  // //   </>
  // // );
}

export default RecoveryPassword;
