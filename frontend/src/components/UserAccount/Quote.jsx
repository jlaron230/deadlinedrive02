import { useState, useEffect } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion"; // Importing motion and AnimatePresence from Framer Motion
import {
  ChevronUpIcon,
  ChevronDownIcon,
  HeartIcon as HeartIconSolid,
  HeartIcon as HeartIconOutline,
} from "@heroicons/react/24/solid"; // Importing icons from HeroIcons
import CommentSection from "@components/CommentSection/CommentSection"; // Importing CommentSection component

function Quote() {
  // State variables for managing quote data and UI states
  const [isEditing, setIsEditing] = useState(true);
  const [quote, setQuote] = useState([]); // State for storing fetched quotes
  console.log(quote);
  const [currentQuotes, setCurrentQuotes] = useState([]); // State for storing filtered quotes
  const [selectedCategory, setSelectedCategory] = useState(null); // State for selected category filter
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal open/close
  const [selectedQuote, setSelectedQuote] = useState(null); // State for selected quote in modal
  const [fav, setFav] = useState(false); // State for managing favorite toggle

  // Function to fetch quotes from API
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Fetching token from localStorage
      if (!token) {
        console.error("No token found");
        navigate("/login"); // Redirecting user to login page if token is missing
        return;
      }

      const userId = localStorage.getItem("id"); // Fetching user ID from localStorage
      if (!userId) {
        console.error("No user ID found"); 
        navigate("/login");
        return;
      }

      // Fetching favorite quotes for the logged-in user
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/favorites/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Passing token in request headers
          },
        }
      );

      setQuote(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
      fetchData(); // Fetching data on component mount

  }, []);

  // Filtering quotes based on selected category
  useEffect(() => {
    // Filtering quotes based on selected category (if any)
    const filteredQuotes = quote.filter((q) =>
      selectedCategory ? q.category === selectedCategory : true
    );
    setCurrentQuotes(filteredQuotes);
  }, [quote, selectedCategory]);

  // Function to handle click on a quote and open modal
  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true); 
  };

  // Function to toggle favorite status of a quote
  const handleFavoriteToggle = async (quoteId) => {
    try {
      // Making PUT request to update quote's favorite status
      const updatedQuote = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/quotes/${quoteId}`
      );
      setQuote((prevQuotes) =>
        prevQuotes.map((q) => (q.id === quoteId ? updatedQuote.data : q))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Function for editing quotes
  const edit = () => {
    setIsEditing(isEditing);
  };

  // Function for handling favorite toggle
  const favorisHandle = () => {
    setFav((prev) => !prev);
  };

  // Filtering quotes based on selected category (Favorites or All)
  const filteredQuotes = selectedCategory === "Favorites"? currentQuotes.filter((q) => q.isFavorite): currentQuotes;

  return (
    <div>
      {!fav ? (
        <>
          {/* Displaying favorite quotes */}
          <div className="flex flex-col max-w-7xl m-auto py-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedCategory}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -10, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-wrap flex-row gap-9 m-auto justify-center"
              >
                {/* Mapping through filtered quotes */}
                {filteredQuotes.map((quote) => (
                  <motion.article
                    key={quote.id}
                    className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-80 min-h-80 flex flex-col hover:bg-slate-50"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleQuoteClick(quote)}
                  >
                    <h2 className="text-xl font-bold">Quote #{quote.id}</h2>
                    {/* Truncating quote text if longer than 89 characters */}
                    <p className="mt-1 pb-4">
                      {quote.text.length > 89
                        ? `${quote.text.substring(0, 88)} [...]`
                        : quote.text}
                    </p>
                    <hr className="w-3/4 border border-black" />
                    <p className="mt-3 text-xl font-semibold">From</p>
                    <p className="mt-2 pb-4">{quote.author}</p>
                    <hr className="w-3/4 border border-black" />
                    <footer className="mt-4 text-lg font-semibold flex justify-between mt-auto">
                      {/* Vote section with upvote and downvote icons */}
                      <section className="flex border-2 border-dashed border-custom-main-orange rounded p-px px-4">
                        <ChevronUpIcon className="w-6 hover:fill-green-500 cursor-pointer" />
                        <p className="text-2xl px-1">{quote.vote}</p>
                        <ChevronDownIcon className="w-6 hover:fill-red-500 cursor-pointer" />
                      </section>
                      {/* Share button */}
                      <button className="rounded bg-custom-main-orange w-1/3 text-white font-normal cursor-copy">
                        Share
                      </button>
                      {/* Favorite button */}
                      <button onClick={() => handleFavoriteToggle(quote.id)}>
                        {quote.isFavorite ? (
                          <HeartIconSolid className="w-6 text-red-700" />
                        ) : (
                          <HeartIconOutline className="w-6 text-gray-700" />
                        )}
                      </button>
                    </footer>
                  </motion.article>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {isModalOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <CommentSection
                  quote={selectedQuote}
                  onClose={() => setIsModalOpen(false)}
                  editing={edit}
                  fav={favorisHandle}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        // Displaying Quote if not in favorites view
        <Quote />
      )}
    </div>
  );
}

export default Quote;
