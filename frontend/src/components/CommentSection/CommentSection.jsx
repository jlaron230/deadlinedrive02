import { ChevronUpIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import axios from 'axios';

function CommentSection({ quote, category, onClose }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [users, setUsers] = useState([]);

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

  // Fonction pour récupérer le prénom de l'utilisateur à partir de l'ID de l'utilisateur
  const getUserFirstName = (userId) => {
    const user = users.find((user) => user.id === parseInt(userId, 10));
    return user ? user.firstName : "Unknown User";
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
                <p className="text-sm font-bold">{getUserFirstName(comment.id_user)}</p>
                <p className="text-xs">{formatDate(comment.created_at)}</p>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
            <div className="mt-4">
              <textarea
                className="w-full p-2 text-sm border border-gray-300 rounded-md"
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
