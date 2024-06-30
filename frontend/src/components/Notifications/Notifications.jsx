import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

function Notifications({ isOpen, onClose, userId }) {
  const [quote, setQuote] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchDailyQuote();
    }
  }, [isOpen, userId]);

  const fetchDailyQuote = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/daily-quote/${userId}`);
      setQuote(response.data.quote);
    } catch (error) {
      console.error('Error fetching daily quote:', error);
      setQuote('No quote available today.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="bg-white p-5 rounded-lg shadow-lg text-center"
               onClick={(e) => e.stopPropagation()}>
            <h2 className="text-xl font-semibold mb-2">Quote of the Day</h2>
            <p className="text-gray-800">{quote}</p>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Notifications;
