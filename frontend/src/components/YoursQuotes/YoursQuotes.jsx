import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Define the App component.
const App = () => {
  // Declare a state variable 'quotes' with an initial value of an empty array.
  // setQuotes is a function to update the 'quotes' state.
  const [quotes, setQuotes] = useState([]);

  // useEffect is a hook that runs the provided function after the initial render.
  // The empty dependency array means this effect runs only once.
  useEffect(() => {
    // Define an asynchronous function to fetch quotes from the server.
    const fetchQuotes = async () => {
      try {
        // Make a GET request to the server to retrieve quotes.
        const response = await axios.get('http://localhost:5000/quotes'); 
        // Sort the quotes by vote count in descending order.
        const sortedQuotes = response.data.sort((a, b) => b.vote - a.vote);
        // Extract the top three quotes based on the vote count.
        const topThreeQuotes = sortedQuotes.slice(0, 3);
        // Update the 'quotes' state with the top three quotes.
        setQuotes(topThreeQuotes);
      } catch (error) {
        // Log an error message to the console if the request fails.
        console.error("Erreur lors de la récupération des citations :", error);
      }
    };

    // Call the fetchQuotes function to fetch the quotes.
    fetchQuotes();
  }, []);

  // Return the JSX to render the component.
  return (
    // The root div element with padding.
    <div className="p-8">
      {/* Heading with center-aligned text and bold font */}
      
      {/* A grid container with padding, gap between items, and custom styling */}
      <div className=" bg-custom-main-orange m-3 rounded-lg">
        <h3 className=" text-white flex flex-col items-center font-semibold px-2 py-3">Citations tendances</h3>
        {/* Map over the quotes array and render each quote in a div */}
        <div className="grid md:grid-cols-3 gap-5 p-4 justify-center">
        {quotes.map((quote, index) => (
          <section key={index}>
            {/* Paragraph for the quote text, centered */}
            <p className="text-center">{quote.text}</p>
            {/* Paragraph for the quote author, bold and centered */}
            <p className="font-semibold text-center">{quote.author}</p>
          </section>
        ))}
        </div>  
      </div>
    </div>
  );
};

export default App;
