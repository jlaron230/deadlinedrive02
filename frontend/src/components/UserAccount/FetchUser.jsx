import { useState, useEffect } from "react";
import FetchData from "./FetchData";
import Password from "./Password";
import UserAccountProps from "./UserAccountProps";
import axios from "axios";
function FetchUser (){
  // const [userId, setUser] = useState({
  // });
const userId = localStorage.getItem('id');
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //         const token = localStorage.getItem('token'); // Récupérez le token JWT depuis localStorage
  //         const response = await axios.get('http://localhost:5000/users/90', {
  //           headers: {
  //             Authorization: `Bearer ${token}` // Incluez le token JWT dans les headers de la requête
  //           }
  //         });

  //       if (response.data && response.data.id) {
  //         setUser(response.data.id);
  //         console.log('User data fetched successfully:', userId);
  //       } else {
  //         console.error('User data or ID not found in response');
  //       }
  //     } catch (error) {
  //       console.error('Error fetching user data:', error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  return (
    <div className="App">
      <FetchData  userId={userId} />
    </div>
  );
}

export default FetchUser;