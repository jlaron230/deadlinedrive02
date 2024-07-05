import React from "react";
import { motion } from "framer-motion";


const WelcomeHome = () => {
  return (
    <main className="md:min-h-[87vh] flex flex-col p-2 items-center justify-center">
       <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1 }}
        >
          <h1 className=" p-8 font-semibold text-3xl flex justify-center">
            Bienvenue sur Deadline Drive, votre allié pour rester motiver !
          </h1>
      </motion.div>
      <article className="flex flex-row flex-wrap p-4 m-2 ">
       

        <motion.div 
        className=" space-y-4 ml-6 flex-1 basis-80  text-1xl text-grey-600"
        initial={{ opacity: 0, x: -100 }} // Start off-screen to the left
        animate={{ opacity: 1, x: 0 }} // Slide in to the final position
        transition={{ duration: 1 }} // Add delay for staggered effect
        >
          <div className="bg-cover bg-center h-[60vh] rounded-[45px] max-[800px] bg-[url('src/assets/bookOpenWhite.jpg')]">
            <div className="flex items-center h-full bg-opacity-50">
              <p className="text-custom-black text-xl font-bold m-8 text-center ">
                Pour commencer, inscrivez-vous sur notre plateforme. Une fois inscrit, vous pourrez définir vos deadlines personnelles. Vous pourrez aussi accéder à de nombreuses citations inspirantes.
              </p>
              
            </div>
        </div>

     
       
          
        </motion.div>
      </article>

      
    </main>
  );
};

export default WelcomeHome;
