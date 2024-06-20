import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "@components/Pagination/Pagination";
import { ChatBubbleBottomCenterTextIcon, ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/solid";

function QuoteCard() {
  const [quote, setQuote] = useState([]);
  const [category, setCategory] = useState([]);
  const [quoteCategory, setQuoteCategory] = useState([]);
  const [currentQuotes, setCurrentQuotes] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 9;

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

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentQuotes(quote.slice(itemOffset, endOffset));
  }, [itemOffset, quote]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % quote.length;
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

  return (
    <>
    <div className="flex flex-col max-w-7xl m-auto">
        <ul className="flex flex-wrap justify-center gap-14 mb-8">
        {category.map((c) => (
            <li key={c.id}>{c.name}</li>
        ))}
        <button className="rounded bg-custom-main-orange text-black font-normal px-3">Créer une citation</button>
        </ul>
      <div className="flex flex-wrap flex-row gap-9 m-auto justify-center">
        {currentQuotes.map((quote) => (
          <article
            key={quote.id}
            className="mb-4 p-4 border-2 border-custom-main-orange shadow w-96 min-h-80 flex flex-col cursor-pointer hover:bg-slate-50"
          >
            <h2 className="text-xl font-bold">Citation n°{quote.id}</h2>
            <p className="mt-1 pb-4">
              {quote.text.length > 89 ? `${quote.text.substring(0, 88)} [...]` : quote.text}
            </p>
            <hr className="w-3/4 border border-black" />
            <p className="mt-3 text-xl font-semibold">Tirée de</p>
            <p className="mt-2 pb-4">{quote.author}</p>
            <hr className="w-3/4 border border-black" />
            <p className="mt-3 text-xl font-semibold">Catégorie</p>
            <p className="mt-2 pb-4">{getCategoryName(quote.id)}</p>
            <footer className="mt-4 text-lg font-semibold flex justify-between mt-auto">
              <section className="flex border-2 border-dashed border-custom-main-orange rounded p-px px-4">
                <ChevronUpIcon className="w-6 hover:fill-green-400" />
                <p className="text-2xl">{quote.vote}</p>
                <ChevronDownIcon className="w-6 hover:fill-red-400" />
                <ChatBubbleBottomCenterTextIcon className="w-6 ml-5 hover:fill-blue-600" />
              </section>
              <button className="rounded bg-custom-main-orange w-1/3 text-white font-normal">
                Partager
              </button>
            </footer>
          </article>
        ))}
      </div>
      </div>
      <Pagination
        pageCount={Math.ceil(quote.length / itemsPerPage)}
        onPageChange={handlePageClick}
      />
    </>
  );
}

export default QuoteCard;
