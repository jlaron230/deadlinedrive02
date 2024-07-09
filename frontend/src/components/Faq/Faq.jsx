import React, { useState } from "react"; // Import React and useState hook for managing component state
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence from framer-motion for animations

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null); // State to manage the currently active FAQ item

  // Function to toggle the visibility of an FAQ item
  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the active index
  };

  // Array of FAQ items with questions and answers
  const faqs = [
    {
      question: "Comment puis-je m'inscrire sur DeadlineDrive ?",
      answer:
        "Pour vous inscrire sur DeadlineDrive, il vous suffit de cliquer sur le bouton \"Inscription\" situé sur la page d'accueil, puis de remplir le formulaire d'inscription avec vos informations personnelles.",
    },
    {
      question:
        "Qu'est-ce que le système de vote sur DeadlineDrive ?",
      answer:
        "Le système de vote affiche les citations les plus populaires et les plus aimées par les utilisateurs.",
    },
    {
      question: "Comment puis-je garder mes citations préféres ?",
      answer:
        "DeadlineDrive intègre un système de favoris pratique qui vous permet de sauvegarder jusqu'à 10 de vos citations préférées. Pour ajouter une citation à vos favoris, il suffit de cliquer sur l'icône en forme de cœur située à côté de la citation. Vous pouvez accéder à tout moment à votre liste de citations favorites depuis votre espace utilisateur.",
    },
    {
      question:
        "Comment puis-je utiliser le calendrier interactif sur DeadlineDrive ?",
      answer:
        "Le calendrier interactif sur DeadlineDrive vous permet de visualiser vos deadlines et de planifier vos actions de manière efficace. En plus de cela, vous pouvez ajouter des tâches à accomplir en cliquant sur une date spécifique et en utilisant la fonctionnalité de tâches intégrée. Cela vous permet de garder une vue d'ensemble de vos objectifs et de suivre votre progression tout au long du temps.",
    },
    {
      question:
        "Comment fonctionne les notifications que je reçois de DeadlineDrive ?",
      answer:
        "Chaque jour, DeadlineDrive vous enverra une notification contenant une citation inspirante choisie aléatoirement. Cette petite dose de motivation est conçue pour stimuler votre journée et vous encourager à atteindre vos objectifs.",
    },
  ];

  // Animation variants for the FAQ answers
  const faqVariants = {
    open: {
      opacity: 1,
      scaleY: 1,
      transition: {
        opacity: { duration: 0.4, delay: 0.1 },
        scaleY: { duration: 0.4, ease: "easeInOut" }
      }
    },
    collapsed: {
      opacity: 0,
      scaleY: 0,
      transition: {
        opacity: { duration: 0.2 },
        scaleY: { duration: 0.2, ease: "easeInOut" }
      }
    }
  };

  return (
    <section className="max-w-screen-lg mx-auto p-4 sm:px-2 py-8"> {/* Section container with max width and padding */}
      <h2 className="text-4xl font-bold text-center mb-4 text-caramel">FAQ</h2> {/* Section title */}
      <div className="space-y-4"> {/* Container for the FAQ items with vertical spacing */}
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-md"> {/* FAQ item container with border and shadow */}
            <button
              className="w-full flex justify-between items-center p-4 font-semibold text-mg text-gray-900" // Questions in bold and slightly larger font
              onClick={() => handleToggle(index)}
            >
              <span>{faq.question}</span>
              <span>{activeIndex === index ? "-" : "+"}</span> {/* Toggle icon */}
            </button>
            <AnimatePresence initial={false}> {/* Manage presence of FAQ answer for animation */}
              {activeIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={faqVariants} // Apply animation variants
                  className="p-4 pt-2 border-t text-base text-gray-700" // Responses in normal weight and slightly smaller font
                  style={{ originY: 0 }}
                >
                  <p>{faq.answer}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ; // Export FAQ component for use in other parts of the application
