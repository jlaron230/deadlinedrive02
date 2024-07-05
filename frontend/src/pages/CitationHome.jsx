import { useState } from "react";
import { motion } from "framer-motion";
import AsideImage from "../assets/example.gif";
import CustomizeQuotes from "./CustomizeQuotes";

export default function CitationHome() {
  const [showCustomizeQuotes, setShowCustomizeQuotes] = useState(false);

  const handleCreateQuoteClick = () => {
    setShowCustomizeQuotes(true);
  };

  return (
    <>
      {!showCustomizeQuotes ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-row w-full mt-36 mb-40"
        >
          <div className="flex flex-col gap-24 w-1/2 m-auto pl-28">
            <div>
              <motion.p
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                className="text-7xl font-bold"
              >
                Sois vecteur d'apprentissage
              </motion.p>
            </div>
            <div>
              <motion.p
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                className="text-3xl italic"
              >
                et fais vibrer ton imagination.
              </motion.p>
            </div>
            <div>
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
                onClick={handleCreateQuoteClick}
                className="border border-gray bg-custom-main-orange hover:bg-orange-300 rounded-lg p-8 border-2 text-white"
              >
                <p className="font-semibold uppercase">Créer une citation</p>
              </motion.button>
            </div>
          </div>
          <div className="w-1/2 pr-28">
            <motion.img
              src={AsideImage}
              alt="test"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
              className="border border-gray"
            />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <CustomizeQuotes />
        </motion.div>
      )}
    </>
  );
}
