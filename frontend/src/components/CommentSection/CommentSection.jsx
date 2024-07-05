import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { HeartIcon as HeartIconOutline } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import ModalFavorites from "@components/Favorites/ModalFavorites";

function CommentSection({
  quote,
  category,
  onClose,
  editing,
  setEditing,
  fav,
}) {
  // State variables for managing comments, user data, and new comment inputs
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");
  const [favIcon, setFavIcon] = useState(false);
  const [updatedQuote, setUpdatedQuote] = useState({
    text: quote.text,
    author: quote.author,
    category: quote.category,
  });
  const [maxQuote, setMaxQuote] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("id");
  // Fetch comments related to the specified quote on component mount or when quote.id changes

  useEffect(() => {
    fetchComments(); // Fetch comments when the component mounts or when quote.id changes
    checkFavorite(); // Check if the current quote is marked as favorite when the component mounts or when quote.id changes
  }, [quote.id]);

  const fetchComments = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/comments/by-quote/${quote.id}`
      );
      const lastThreeComments = response.data[0].slice(-3);
      setComments(lastThreeComments);
    } catch (error) {
      console.error("Error loading comments:", error);
    }
  };

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

  // Add a new comment
  const handleAddComment = () => {
    const commentData = {
      content: newComment,
      id_user: localStorage.getItem("id"), // Retrieve user ID from local storage
      id_quote: quote.id,
    };

    axios
      .post("http://localhost:5000/comment", commentData)
      .then((response) => {
        // Append the new comment to the current list and reset input field
        setComments([
          ...comments,
          {
            ...commentData,
            username: getUserFirstNameFromLocalStorage(),
            created_at: new Date().toISOString(),
          },
        ]);
        setNewComment("");
      })
      .catch((error) => console.error("Failed to add comment:", error));
  };

  // Delete a comment
  const handleDeleteComment = (commentId) => {
    axios
      .delete(`http://localhost:5000/comment/${commentId}`)
      .then(() => {
        // Remove the deleted comment from the state
        setComments(comments.filter((comment) => comment.id !== commentId));
      })
      .catch((error) => console.error("Failed to delete comment:", error));
  };

  // Start editing a comment
  const handleEditComment = (commentId) => {
    setEditingComment(commentId);
    const comment = comments.find((comment) => comment.id === commentId);
    setEditedContent(comment.content);
  };

  // Update a comment
  const handleUpdateComment = (commentId) => {
    axios
      .put(`http://localhost:5000/comment/${commentId}`, {
        content: editedContent,
        id_user: localStorage.getItem("id"),
        id_quote: quote.id,
      })
      .then(() => {
        // Update the comment content in the state
        setComments(
          comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: editedContent }
              : comment
          )
        );
        setEditingComment(null);
        setEditedContent("");
      })
      .catch((error) => console.error("Failed to update comment:", error));
  };

  // Format dates for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Retrieve user's first name from local storage or return a placeholder
  const getUserFirstNameFromLocalStorage = () => {
    return localStorage.getItem("firstName") || "NomUtilisateur";
  };

  // Retrieve user's first name from state by user ID
  const getUserFirstName = (userId) => {
    const user = users.find((user) => user.id === parseInt(userId, 10));
    return user ? user.firstName : "Unknown User";
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

  // Render the comment section with UI for viewing and managing comments
  return (
    <div>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div>{!maxQuote ? null : <ModalFavorites />}</div>
        <div className="bg-white rounded-lg max-w-5xl w-full p-6 border border-2 border-custom-main-orange pb-12">
          <div className="flex justify-end mb-4">
            <button onClick={onClose} className="text-white">
              <XMarkIcon className="bg-red-500 w-6 h-6" />
            </button>
          </div>
          <div className="flex justify-center flex-wrap">
            <>
              <p className="mb-2 w-full font-bold text-xl">Quote {quote.id}</p>
              <p className="mb-6 w-full break-words text-xl">“{quote.text}”</p>
              <p className="mb-2 w-full font-semibold text-xl">Tirée de</p>
              <p className="mb-6 w-full break-words text-xl">{quote.author}</p>
              <p className="mb-2 w-full font-semibold text-xl">Catégorie</p>
              <p className="mb-6 w-full break-words text-xl">
                {quote.category}
              </p>
            </>
            <footer className="mt-4 text-lg font-semibold flex w-full gap-2">
              <section className="flex border-2 border-dashed border-custom-main-orange rounded p-px px-4">
                <ChevronUpIcon className="w-6 hover:fill-green-500 cursor-pointer" />
                <p className="text-2xl px-1">{quote.vote}</p>
                <ChevronDownIcon className="w-6 hover:fill-red-500 cursor-pointer" />
              </section>
              <div className="flex gap-2.5">
                <button className="rounded bg-custom-main-orange w-36 text-white font-normal cursor-pointer">
                  Partager
                </button>
              </div>

              <div>
                {favIcon ? (
                  <button className="flex" href="#">
                    <HeartIcon
                      onClick={handleFavoriteToggle}
                      className="w-2/12 text-red-700"
                    />
                  </button>
                ) : (
                  <button className="flex" href="#">
                    <HeartIconOutline
                      onClick={handleFavoriteToggle}
                      className="w-2/12 text-gray-700"
                    />
                  </button>
                )}
              </div>
            </footer>
            <div className="w-full mt-4">
              {comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
                  <p className="text-lg font-bold">
                    {getUserFirstName(comment.id_user)}
                  </p>
                  <p className="text-sm">{formatDate(comment.created_at)}</p>
                  {editingComment === comment.id ? (
                    <div className="flex flex-col">
                      <textarea
                        className="w-full p-2 text-base border border-gray-300 rounded-md"
                        value={editedContent}
                        onChange={(e) => setEditedContent(e.target.value)}
                      />
                      <button
                        className="mt-2 bg-butterscotch hover:bg-caramel text-white font-bold py-2 px-4 rounded w-/4"
                        onClick={() => handleUpdateComment(comment.id)}
                      >
                        Modifier votre commentaire
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm">{comment.content}</p>
                  )}
                  <div className="flex space-x-2 mt-2 justify-end">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleEditComment(comment.id)}
                    >
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDeleteComment(comment.id)}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default CommentSection;
