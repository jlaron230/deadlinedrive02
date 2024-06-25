import { ChevronUpIcon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useState } from 'react';

function CommentSection({ quote, category, onClose }) {
  const [comments, setComments] = useState([]); // Simule les données chargées de la base de données
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    // Ici, vous devez intégrer une API pour envoyer le commentaire à votre base de données
    const newCommentData = {
      username: "NomUtilisateur", // Remplacez par le nom d'utilisateur actuel, si disponible
      date: new Date().toLocaleDateString(),
      content: newComment
    };
    setComments([...comments, newCommentData]);
    setNewComment(""); // Réinitialiser le champ après soumission
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
                <p className="text-sm font-bold">{comment.username}</p>
                <p className="text-xs">{comment.date}</p>
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
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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