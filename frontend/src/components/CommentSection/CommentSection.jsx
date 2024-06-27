import { ChevronUpIcon, ChevronDownIcon, XMarkIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ quote, category, onClose }) {
  const [comments, setComments] = useState([]);
  const [users, setUsers] = useState([]); // Ajout de l'état users
  const [newComment, setNewComment] = useState("");
  const [editingComment, setEditingComment] = useState(null);
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    // Charger les commentaires au chargement du composant
    axios.get(`http://localhost:5000/comments?quoteId=${quote.id}`)
      .then(response => {
        // Isoler le tableau à l'index 0
        const commentsArray = response.data[0];
        // Garder seulement les 3 derniers éléments
        const lastThreeComments = commentsArray.slice(-3);
        setComments(lastThreeComments);
      })
      .catch(error => console.error('Error loading comments:', error));
  }, [quote.id]);

  useEffect(() => {
    // Charger les utilisateurs au chargement du composant
    axios.get('http://localhost:5000/users')
      .then(response => setUsers(response.data))
      .catch(error => console.error('Error loading users:', error));
  }, []);

  const handleAddComment = () => {
    const commentData = {
      content: newComment,
      id_user: localStorage.getItem('id'), // Assurez-vous de remplacer ceci par l'ID de l'utilisateur actuel
      id_quote: quote.id
    };

    axios.post('http://localhost:5000/comment', commentData)
      .then(response => {
        setComments([...comments, { ...commentData, username: getUserFirstNameFromLocalStorage(), created_at: new Date().toISOString() }]);
        setNewComment(""); // Réinitialiser le champ après soumission
      })
      .catch(error => console.error('Failed to add comment:', error));
  };

  const handleDeleteComment = (commentId) => {
    axios.delete(`http://localhost:5000/comment/${commentId}`)
      .then(() => {
        setComments(comments.filter(comment => comment.id !== commentId));
      })
      .catch(error => console.error('Failed to delete comment:', error));
  };

  const handleEditComment = (commentId) => {
    setEditingComment(commentId);
    const comment = comments.find(comment => comment.id === commentId);
    setEditedContent(comment.content);
  };

  const handleUpdateComment = (commentId) => {
    axios.put(`http://localhost:5000/comment/${commentId}`, { content: editedContent })
      .then(() => {
        setComments(comments.map(comment => {
          if (comment.id === commentId) {
            return { ...comment, content: editedContent };
          }
          return comment;
        }));
        setEditingComment(null);
        setEditedContent("");
      })
      .catch(error => console.error('Failed to update comment:', error));
  };

  // Fonction pour formater la date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  // Fonction pour récupérer le prénom de l'utilisateur depuis le localStorage
  const getUserFirstNameFromLocalStorage = () => {
    return localStorage.getItem('firstName') || 'NomUtilisateur';
  };

  // Fonction pour récupérer le prénom de l'utilisateur à partir de l'ID de l'utilisateur
  const getUserFirstName = (userId) => {
    const user = users.find((user) => user.id === parseInt(userId, 10));
    return user ? user.firstName : "Unknown User";
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="bg-white rounded-lg max-w-5xl w-full p-6 border border-2 border-custom-main-orange pb-12">
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
                <p className="text-lg font-bold">{getUserFirstName(comment.id_user)}</p>
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
                    <PencilIcon className="w-6 h-6" />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteComment(comment.id)}
                  >
                    <TrashIcon className="w-6 h-6" />
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
