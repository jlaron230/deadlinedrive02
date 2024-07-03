import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the App component.
const App = () => {
  // Declare a state variable 'quotes' with an initial value of an empty array.
  // setQuotes is a function to update the 'quotes' state.
  const [quotes, setQuotes] = useState([]);
  const [category, setCategory] = useState([]);
  const [quoteCategory, setQuoteCategory] = useState([]);

  // useEffect is a hook that runs the provided function after the initial render.
  // The empty dependency array means this effect runs only once.
  useEffect(() => {
    // Define an asynchronous function to fetch quotes from the server.
    const fetchQuotes = async () => {
      try {
        // Make a GET request to the server to retrieve quotes.
        const response = await axios.get('http://localhost:5000/quotes'); 
        const resCategory = await axios.get('http://localhost:5000/categories')
        const resQuoteCategory = await axios.get('http://localhost:5000/quote_category')
        // Sort the quotes by vote count in descending order.
        const sortedQuotes = response.data.sort((a, b) => b.vote - a.vote);
        // Extract the top three quotes based on the vote count.
        const topThreeQuotes = sortedQuotes.slice(0, 3);
        // Update the 'quotes' state with the top three quotes.
        setQuotes(topThreeQuotes);
        setCategory(resCategory.data);
        setQuoteCategory(resQuoteCategory.data);
      } catch (error) {
        // Log an error message to the console if the request fails.
        console.error("Erreur lors de la récupération des citations :", error);
      }
    };

    // Call the fetchQuotes function to fetch the quotes.
    fetchQuotes();
  }, []);

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

  // Return the JSX to render the component.
  return (
    // The root div element with padding.
    <div className="p-8">
      {/* Heading with center-aligned text and bold font */}
      
      {/* A grid container with padding, gap between items, and custom styling */}
      <div className="  m-3 rounded-lg">
        <div className="flex justify-center "> 
          <h3 className="w-64 text-white flex flex-col items-center font-semibold p-4 bg-custom-main-orange rounded-md ">Citations tendances</h3>
        </div>
       
        {/* Map over the quotes array and render each quote in a div */}
        <div className="grid md:grid-cols-3 gap-5 p-4 justify-center">
        {quotes.map((quote, index) => (
          <section key={index} className=" mb-4 p-4 border-2 rounded-md border-custom-main-orange shadow">
             <h3 className="text-xl font-bold">Nombre d'upvote : {quote.vote}</h3>
             <p className="mt-1 pb-4">
                  {quote.text}
                </p>
                <hr className="w-3/4 border border-black" />
                <p className="mt-3 text-xl font-semibold">Tirée de</p>
                <p className="mt-2 pb-4">{quote.author}</p>
                <hr className="w-3/4 border border-black" />
                <p className="mt-3 text-xl font-semibold">Catégorie</p>
                <p className="mt-2 pb-4">{getCategoryName(quote.id)}</p>
          </section>
        ))}
        </div>  
      </div>
    </div>
  );
};

export default App;
