import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@components/Pagination/Pagination";
import { ChevronUpIcon, ChevronDownIcon, HeartIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import CommentSection from "@components/CommentSection/CommentSection";



function QuoteCard() {
  const [quote, setQuote] = useState([]);
  const [category, setCategory] = useState([]);
  const [quoteCategory, setQuoteCategory] = useState([]);
  const [currentQuotes, setCurrentQuotes] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const itemsPerPage = 9;

  const fetchData = async () => {
    try {
      const [resQuote, resCategory, resQuoteCategory] = await Promise.all([
        axios.get("http://localhost:5000/quotes"),
        axios.get("http://localhost:5000/categories"),
        axios.get("http://localhost:5000/quote_category"),
      ]);
      setQuote(resQuote.data);
      setCategory(resCategory.data);
      setQuoteCategory(resQuoteCategory.data);
      console.log(resQuoteCategory.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    const filteredQuotes = selectedCategory
      ? quote.filter((q) => getCategoryName(q.id) === selectedCategory)
      : quote;
    setCurrentQuotes(filteredQuotes.slice(itemOffset, endOffset));
  }, [itemOffset, quote, selectedCategory]);

  const handlePageClick = (event) => {
    const filteredQuotes = selectedCategory
      ? quote.filter((q) => getCategoryName(q.id) === selectedCategory)
      : quote;
    const newOffset = (event.selected * itemsPerPage) % filteredQuotes.length;
    setItemOffset(newOffset);
  };

  const getCategoryName = (quoteId) => {
    const quoteCat = quoteCategory.find((qc) => qc.id_quote === quoteId);
    if (quoteCat) {
      const categories = category.find(
        (cat) => cat.id === quoteCat.id_category
      );
      return categories ? categories.name : "Unknown Category";
    }
    return "No Category";
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    setItemOffset(0);
  };

  const handleQuoteClick = (quote) => {
    setSelectedQuote(quote);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col max-w-7xl m-auto py-6">
        <ul className="flex flex-wrap justify-center gap-14 mb-8">
          {category.map((c) => (
            <motion.li
              whileHover={{ scale: 1.1 }}
              onHoverStart={(e) => {}}
              onHoverEnd={(e) => {}}
              key={c.id}
              className={`cursor-pointer ${
                selectedCategory === c.name
                  ? "font-semibold border border-2 border-custom-main-orange px-1"
                  : ""
              }`}
              onClick={() => handleCategoryClick(c.name)}
            >
              {c.name}
            </motion.li>
          ))}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.6 }}
            className="rounded bg-custom-main-orange text-black font-normal px-3"
          >
            Gérer mes citations
          </motion.button>
        </ul>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex flex-wrap flex-row gap-9 m-auto justify-center"
          >
            {currentQuotes.map((quote) => (
              <motion.article
                key={quote.id}
                className="mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow w-96 min-h-80 flex flex-col hover:bg-slate-50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleQuoteClick(quote)}
              >
                <h2 className="text-xl font-bold">Citation n°{quote.id}</h2>
                <p className="mt-1 pb-4">
                  {quote.text.length > 89
                    ? `${quote.text.substring(0, 88)} [...]`
                    : quote.text}
                </p>
                <hr className="w-3/4 border border-black" />
                <p className="mt-3 text-xl font-semibold">Tirée de</p>
                <p className="mt-2 pb-4">{quote.author}</p>
                <hr className="w-3/4 border border-black" />
                <p className="mt-3 text-xl font-semibold">Catégorie</p>
                <p className="mt-2 pb-4">{getCategoryName(quote.id)}</p>
                <footer className="mt-4 text-lg font-semibold flex justify-between mt-auto">
                  <section className="flex border-2 border-dashed border-custom-main-orange rounded p-px px-4">
                    <ChevronUpIcon
                      className="w-6 hover:fill-green-500 cursor-pointer"
                      // onClick={() => handleUpvote(quote.id)}
                    />
                    <p className="text-2xl px-1">{quote.vote}</p>
                    <ChevronDownIcon
                      className="w-6 hover:fill-red-500 cursor-pointer"
                      // onClick={() => handleDownvote(quote.id)}
                    />
                  </section>
                  <button className="rounded bg-custom-main-orange w-1/3 text-white font-normal cursor-copy">
                    Partager
                  </button>
                </footer>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>{" "}
        <Pagination
          pageCount={Math.ceil(
            (selectedCategory
              ? quote.filter((q) => getCategoryName(q.id) === selectedCategory)
              : quote
            ).length / itemsPerPage
          )}
          onPageChange={handlePageClick}
        />
      </div>
      <AnimatePresence>
        {isModalOpen && (
          <CommentSection
            quote={selectedQuote}
            category={getCategoryName(selectedQuote.id)}
            onClose={() => setIsModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

export default QuoteCard;
