import React from "react";
import { motion } from "framer-motion";

const WelcomeHome = () => {
  return (
    <main className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center">
      <h1 className=" p-8 font-semibold text-xl flex justify-center">
        Bienvenue sur Deadline Drive, votre allié pour rester motiver
      </h1>

      <article className="flex flex-row flex-wrap p-4 m-2 ">
        <motion.div
          className="flex-1 basis-80"
          initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
          animate={{ opacity: 1, x: 0 }} // Slide in to the final position
          transition={{ duration: 0.5 }} // Add delay for staggered effect
        >
          <img
            src="src\assets\image-live-work.webp"
            alt=" Image d'un mur avec les mots : Live, work and create "
            className=" rounded-md h-max w-full	"
          />
        </motion.div>

        <motion.div 
        className=" space-y-4 ml-6 flex-1 basis-80  text-1xl text-grey-600"
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // Slide in to the final position
        transition={{ duration: 0.5 }} // Add delay for staggered effect
        >
          <p>
            Pour commencer, inscrivez-vous sur notre plateforme. Une fois
            inscrit, vous pourrez définir vos deadlines personnelles. Chaque
            jour, vous recevrez une notification avec une citation inspirante
            correspondant à un thème que vous aurez choisi parmi nos catégories
            : sport, personnalité, auteurs, manga, série, film, histoire,
            poésie. Voici un aperçu des fonctionnalités disponibles sur
            DeadlineDrive :
          </p>

          <p>
            Voici un aperçu des fonctionnalités disponibles sur DeadlineDrive :
          </p>

          <ul className="list-disc">
            <li>
              {" "}
              Choix du type de citations pour personnaliser votre inspiration
              quotidienne.{" "}
            </li>
            <li>
              {" "}
              Accès à un calendrier interactif pour visualiser vos deadlines et
              planifier vos actions.{" "}
            </li>
            <li>
              {" "}
              Participation à notre système de trending quotes où vous pourrez
              découvrir les citations les plus appréciées et les partager avec
              la communauté.{" "}
            </li>
          </ul>
        </motion.div>
      </article>

      <h2 className=" p-8 text-xl flex justify-center">
        Rejoignez dès maintenant notre communauté sur DeadlineDrive et donnez un
        nouvel élan à votre motivation !
      </h2>
    </main>
  );
};

export default WelcomeHome;
