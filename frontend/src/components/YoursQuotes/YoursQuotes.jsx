import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/quotes'); // Remplacez par l'URL de votre API
        const sortedQuotes = response.data.sort((a, b) => b.vote - a.vote);
        const topThreeQuotes = sortedQuotes.slice(0, 3);
        setQuotes(topThreeQuotes);
      } catch (error) {
        console.error("Erreur lors de la récupération des citations :", error);
      }
    };

    fetchQuotes();
  }, []);

  return (
    <div>
      <h3 class=" flex flex-col items-center">Citations tendances</h3>
       <div class="flex flex-row items-center p-8  bg-amber-500 m-3 rounded-lg">
        {quotes.map((quote, index) => (
            <div key={index} >
    
            <p class="text-center ">{quote.text}</p>
            <p class="font-semibold text-center"> {quote.author}</p>
            </div>
      ))}  
      </div>
    </div>
  );
};

export default App;


