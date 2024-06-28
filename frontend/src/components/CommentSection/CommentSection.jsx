import {
  ChevronUpIcon,
  ChevronDownIcon,
  XMarkIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

function CommentSection({ quote, category, onClose }) {
  // State for storing the comments
  const [comments, setComments] = useState([]);
  // State for storing user data
  const [users, setUsers] = useState([]);
  // State for storing new comment input
  const [newComment, setNewComment] = useState("");
  // State for tracking which comment is being edited
  const [editingComment, setEditingComment] = useState(null);
  // State for storing the edited comment content
  const [editedContent, setEditedContent] = useState("");
  // State for tracking the user ID from local storage
  const [userId, setUserID] = useState(localStorage.getItem("id"));
  // Ref for the modal content to track clicks outside
  const modalRef = useRef(null);

  // Effect for fetching comments based on the quote ID
  useEffect(() => {
    axios.get(`http://localhost:5000/comments/by-quote/${quote.id}`)
      .then(response => {
        const lastThreeComments = response.data[0].slice(-3);
        setComments(lastThreeComments);
      })
      .catch(error => console.error("Error loading comments:", error));
  }, [quote.id]);

  // Effect for fetching user data
  useEffect(() => {
    axios.get("http://localhost:5000/users")
      .then(response => setUsers(response.data))
      .catch(error => console.error("Error loading users:", error));
  }, []);

  // Function to add a new comment
  const handleAddComment = () => {
    const commentData = {
      content: newComment,
      id_user: userId,
      id_quote: quote.id,
    };
    axios.post("http://localhost:5000/comment", commentData)
      .then(response => {
        setComments([...comments, {
          ...commentData,
          username: getUserFirstNameFromLocalStorage(),
          created_at: new Date().toISOString(),
        }]);
        setNewComment("");
      })
      .catch(error => console.error("Failed to add comment:", error));
  };

  // Function to delete a comment
  const handleDeleteComment = (commentId) => {
    axios.delete(`http://localhost:5000/comment/${commentId}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error("Failed to delete comment:", error));
  };

  // Function to start editing a comment
  const handleEditComment = (commentId) => {
    setEditingComment(commentId);
    const comment = comments.find(comment => comment.id === commentId);
    setEditedContent(comment.content);
  };

  // Function to update a comment
  const handleUpdateComment = (commentId) => {
    axios.put(`http://localhost:5000/comment/${commentId}`, {
      content: editedContent,
      id_user: userId,
      id_quote: quote.id
    })
      .then(() => {
        setComments(comments.map(comment =>
          comment.id === commentId ? { ...comment, content: editedContent } : comment
        ));
        setEditingComment(null);
        setEditedContent("");
      })
      .catch(error => console.error("Failed to update comment:", error));
  };

  // Function to format dates for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  // Function to retrieve the user's first name from local storage
  const getUserFirstNameFromLocalStorage = () => {
    return localStorage.getItem("firstName") || "NomUtilisateur";
  };

  // Function to retrieve a user's first name from the users state by user ID
  const getUserFirstName = (userId) => {
    const user = users.find(user => user.id === parseInt(userId, 10));
    return user ? user.firstName : "Unknown User";
  };

  // Function to handle clicking outside of the modal content to close the modal
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose(); // Close modal if click is outside
    }
  };

  // Render the component with the modal and comments
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50"
      onClick={handleClickOutside}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-lg max-w-5xl w-full p-6 border border-2 border-custom-main-orange pb-12 overflow-auto"
        style={{ maxHeight: '85vh' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <div className="flex justify-end mb-4">
          <button onClick={onClose} className="text-white">
            <XMarkIcon className="bg-red-500 w-6 h-6" />
          </button>
        </div>
        <div className="flex justify-center flex-wrap">
          <p className="mb-2 w-full font-bold text-xl">Quote {quote.id}</p>
          <p className="mb-6 w-full break-words text-xl">“{quote.text}”</p>
          <p className="mb-2 w-full font-semibold text-xl">Tirée de</p>
          <p className="mb-6 w-full break-words text-xl">{quote.author}</p>
          <p className="mb-2 w-full font-semibold text-xl">Catégorie</p>
          <p className="mb-6 w-full break-words text-xl">{category}</p>
          <footer className="mt-4 text-lg font-semibold flex w-full gap-2">
            <section className="flex border-2 border-dashed border-custom-main-orange rounded p-px px-4">
              <ChevronUpIcon className="w-6 hover:fill-green-500 cursor-pointer" />
              <p className="text-2xl px-1">{quote.vote}</p>
              <ChevronDownIcon className="w-6 hover:fill-red-500 cursor-pointer" />
            </section>
            <button className="rounded bg-custom-main-orange w-36 text-white font-normal cursor-pointer">
              Partager
            </button>
          </footer>
          <div className="w-full mt-4">
            {comments.map((comment, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-lg mb-2">
                <p className="text-lg font-bold">
                  {getUserFirstName(comment.id_user)}
                </p>
                <p className="text-sm">{formatDate(comment.created_at)}</p>
                {editingComment === comment.id && parseInt(userId) === comment.id_user? (
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
                    {parseInt(userId) === comment.id_user && <PencilIcon className="w-5 h-5" />}
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    {parseInt(userId) === comment.id_user && <TrashIcon className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}
            <div className="mt-4">
              <textarea
                className="w-full p-2 text-base border border-gray-300 rounded-md"
                placeholder="Ajoutez un commentaire..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                className="mt-2 bg-butterscotch hover:bg-caramel text-white font-bold py-2 px-4 rounded"
                onClick={handleAddComment}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CommentSection;
