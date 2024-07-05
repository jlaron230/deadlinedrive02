import { useState, useEffect } from "react";
import {
    ChevronUpIcon,
    ChevronDownIcon,
    XMarkIcon,
    PencilIcon,
    TrashIcon,
    HeartIcon,
  } from "@heroicons/react/24/solid";
  import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
  import ModalFavorites from "@components/Favorites/ModalFavorites";
  import axios from "axios";
import { useNavigate } from "react-router-dom";

function QuotesFavoris({ quote, category, onClose, editing, setEditing, fav, outline, fill }) {
    const [favIcon, setFavIcon] = useState(false);
    const [maxQuote, setMaxQuote] = useState(false);

  useEffect(() => {
    checkFavorite(); // Check if the current quote is marked as favorite when the component mounts or when quote.id changes
  }, [quote.id]);

  const checkFavorite = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from localStorage
      const userId = localStorage.getItem("id"); // Retrieve user ID from localStorage

      // Check if token or userId is missing
      if (!token || !userId) {
        console.error("Token or user ID not found");
        return;
      }

      // Fetch user's favorites from the server
      const response = await axios.get(
        // Remplacer par variable d'environnement
        `http://localhost:5000/favorites/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const favorites = response.data;
      // Check if favorites is an array
      if (Array.isArray(favorites)) {
        // Check if the current quote ID exists in the favorites array
        const isFavorite = favorites.some(
          (favorite) => favorite.id === quote.id
        );

        setFavIcon(isFavorite);
      } else {
        console.error("Favorites is not an array:", favorites);
      }
    } catch (error) {
      console.error("Failed to check favorites:", error);
    }
  };

  // Function for add or delete favorite item
  const handleFavoriteToggle = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      // If either the token or user ID is missing, navigate to the login page
      if (!token || !userId) {
        navigate("/login");
        return;
      }

      if (favIcon) {
        setFavIcon((prev) => !prev);
        // Make a DELETE request to remove the favorite
        await axios.delete(`http://localhost:5000/favorites/${quote.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          data: {
            id_user: userId,
            id_quote: quote.id,
          },
        });
        console.log("suppression");
        fav((prev) => !prev);
      } else {
        // Toggle the favorite icon state
        setFavIcon((prev) => !prev);
        // Check if the maximum number of quotes (10) is not exceeded
        if (quote.id <= 10) {
          setMaxQuote(false);
          // Make a POST request to add the quote as a favorite
          await axios.post(
            `http://localhost:5000/favorites`,
            {
              id_user: userId,
              id_quote: quote.id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          // Set the max quote state to true if the limit is exceeded
          setMaxQuote(true);
          null;
        }
      }
    } catch (error) {
      console.error("Failed to add/remove favorite:", error);
    }
  };

  return (
    <div>
        {!maxQuote ? null : <ModalFavorites />}
      {favIcon ? (
        <button onClick={fill} className="flex" href="#">
          <HeartIcon
            onClick={handleFavoriteToggle}
            className="w-2/12 text-red-700"
          />
        </button>
      ) : (
        <button onClick={outline} className="flex" href="#">
          <HeartIconOutline
            onClick={handleFavoriteToggle}
            className="w-2/12 text-gray-700"
          />
        </button>
      )}
    </div>
  );
}

export default QuotesFavoris;
