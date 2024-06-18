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
    <div class="p-8">
      <h3 class=" flex flex-col items-center font-semibold " >Citations tendances</h3>
       <div class="grid md:grid-cols-3  gap-5 p-4 justify-center	 bg-custom-main-orange m-3 rounded-lg">
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


