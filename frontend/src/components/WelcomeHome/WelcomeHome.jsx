import React from "react";
import { motion } from "framer-motion";


const WelcomeHome = () => {
  return (
    <main className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center">
      <h1 className=" p-8 font-semibold text-3xl flex justify-center">
        Bienvenue sur Deadline Drive, votre allié pour rester motiver
      </h1>

      <article className="flex flex-row flex-wrap p-4 m-2 ">
       

        <motion.div 
        className=" space-y-4 ml-6 flex-1 basis-80  text-1xl text-grey-600"
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // Slide in to the final position
        transition={{ duration: 0.5 }} // Add delay for staggered effect
        >
         
        <div className="bg-contain bg-center h-[70vh] rounded-[45px] bg-[url('src/assets/image-live-work.webp')]">
            <div className="flex items-center h-full bg-opacity-50">
              <p className="text-white text-2xl font-bold m-8 text-left ">
                Pour commencer, inscrivez-vous sur notre plateforme. Une fois inscrit, vous pourrez définir vos deadlines personnelles. Vous pourrez aussi accéder à des citations inspirantes correspondant à un thème que vous aurez choisi parmi nos catégories : sport, personnalité, auteurs, manga, série, film, histoire, poésie.
              </p>
            </div>
        </div>


          
        </motion.div>
      </article>

      
    </main>
  );
};

export default WelcomeHome;
