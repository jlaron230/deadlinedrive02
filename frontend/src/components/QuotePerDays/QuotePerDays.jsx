import React, { useState, useEffect } from "react";
import axios from "axios";

const QuotePerDays = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [quotes, setQuotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [quoteCategories, setQuoteCategories] = useState([]);
  const [randomQuote, setRandomQuote] = useState(null);

  // useEffect(() => {
  //   const token = localStorage.getItem("jwtToken");
  //   setIsLoggedIn(!!token); // Simplification de la vérification du token
  // }, []);

  const fetchData = async () => {
    try {
      const [resQuote, resCategory, resQuoteCategory] = await Promise.all([
        axios.get("http://localhost:5000/quotes"),
        axios.get("http://localhost:5000/categories"),
        axios.get("http://localhost:5000/quote_category"),
      ]);
      setQuotes(resQuote.data);
      setCategories(resCategory.data);
      setQuoteCategories(resQuoteCategory.data);

      if (resQuoteCategory.data.length > 0) {
        selectRandomQuote(resQuote.data, resCategory.data, resQuoteCategory.data);
      }
    } catch (error) {
      console.error(error);
    }

  };

 

  useEffect(() => {
    fetchData();
  }, []);



  const selectRandomQuote = (quotes, categories, quoteCategories) => {
    const randomIndex = Math.floor(Math.random() * quoteCategories.length);
    const randomQuoteCategory = quoteCategories[randomIndex];
    const quote = quotes.find(q => q.id === randomQuoteCategory.id_quote);
    const category = categories.find(c => c.id === randomQuoteCategory.id_category);

    
    if (quote && category) {
      setRandomQuote({ text: quote.text, author: quote.author, category: category.name });
    } else {
      console.error("Quote or Category not found");
    }
  };

  const handleNewRandomQuote = () => {
    if (quoteCategories.length > 0) {
      selectRandomQuote(quotes, categories, quoteCategories);
    }
  };

  // console.log(quoteCategories);

  return (
    <div>
      {isLoggedIn ? (
        <div className="flex flex-col items-center">
          <a href={'/signup'}>
            <button className="font-semibold p-4 bg-custom-main-orange rounded-lg">
              Appuyez ici pour vous connecter ou vous enregistrer !
            </button>
          </a>
        </div>
      ) : (
      
        <div className="p-4 flex flex-col items-center bg-custom-main-orange m-3 rounded-lg">
          
          {randomQuote ? (
            <div>
              <p><strong>Citation:</strong> {randomQuote.text}</p>
              <p><strong>Autheur:</strong> {randomQuote.author}</p>
              <p><strong>Categorie:</strong> {randomQuote.category}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <button onClick={handleNewRandomQuote} className="hover:text-black mt-12 inline-block rounded-lg border border-white px-4 py-3 text-center text-base font-semibold text-white transition hover:bg-white hover:text-primary">Get Another Random Quote</button>
        </div>
      )}
    </div>
  );
};


export default QuotePerDays;
