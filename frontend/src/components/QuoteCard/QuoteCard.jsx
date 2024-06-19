import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@components/Pagination/Pagination";

function QuoteCard() {
  const [quote, setQuote] = useState([]);
  const [category, setCategory] = useState([]);
  const [quoteCategory, setQuoteCategory] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // État pour la page actuelle
  const quotesPerPage = 9; // Nombre de citations par page

  const fetchData = async () => {
    const [resQuote, resCategory, resQuoteCategory] = await Promise.all([
      axios.get("http://localhost:5000/quotes"),
      axios.get("http://localhost:5000/categories"),
      axios.get("http://localhost:5000/quote_category"),
    ]);
    setQuote(resQuote.data);
    setCategory(resCategory.data);
    setQuoteCategory(resQuoteCategory.data);
    console.log(resQuoteCategory.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Calculer les citations à afficher pour la page actuelle
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = quote.slice(indexOfFirstQuote, indexOfLastQuote);

  // Fonction pour changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Nombre total de pages
  const totalPages = Math.ceil(quote.length / quotesPerPage);

  return (
    <>
      <div>
        {currentQuotes.map((quote) => (
          <article key={quote.id}>
            <h1>Citation n°{quote.id}</h1>
            <p>{quote.text}</p>
            <h2>Tirée de</h2>
            <p>{quote.author}</p>
            <h3>Catégorie</h3>
            <p>
              {/* //TODO Render the category name */}
              NULL
            </p>
          </article>
        ))}
      </div>
      <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      paginate={paginate}
      />
    </>
  );
}

export default QuoteCard;
