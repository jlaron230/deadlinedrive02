import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

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
      question: "Comment puis-je choisir mes préférences de citations ?",
      answer:
        "Vous pouvez choisir vos préférences de citations dans les paramètres de votre compte.",
    },
    {
      question:
        "Comment puis-je utiliser le calendrier interactif sur DeadlineDrive ?",
      answer:
        "Le calendrier interactif sur DeadlineDrive vous permet de visualiser vos deadlines et de planifier vos actions de manière efficace. En plus de cela, vous pouvez ajouter des tâches à accomplir en cliquant sur une date spécifique et en utilisant la fonctionnalité de tâches intégrée. Cela vous permet de garder une vue d'ensemble de vos objectifs et de suivre votre progression tout au long du temps.",
    },
    {
      question:
        "Puis-je personnaliser les notifications que je reçois de DeadlineDrive ?",
      answer:
        "Oui, vous pouvez personnaliser les notifications que vous recevez de DeadlineDrive selon vos préférences. Dans les paramètres de votre compte, vous avez la possibilité de choisir quels types de notifications vous souhaitez recevoir et comment vous souhaitez les recevoir (par exemple, par e-mail ou via l'application). Cela vous permet de rester informé de manière efficace tout en évitant toute surcharge d'informations.",
    },
  ];

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
    <section className="max-w-screen-lg mx-auto p-4 sm:px-2 py-8">
      <h2 className="text-4xl font-bold text-center mb-4 text-caramel">FAQ</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border rounded-lg shadow-md">
            <button
              className="w-full flex justify-between items-center p-4 font-semibold text-mg text-gray-900" // Questions in bold and slightly larger font
              onClick={() => handleToggle(index)}
            >
              <span>{faq.question}</span>
              <span>{activeIndex === index ? "-" : "+"}</span>
            </button>
            <AnimatePresence initial={false}>
              {activeIndex === index && (
                <motion.div
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={faqVariants}
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

export default FAQ;