import { useEffect, useState } from "react";
import axios from "axios";

function ChooseAuthor() {
  const [quotes, setQuotes] = useState([]);
  const [authors, setAuthors] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/quotes");
      setQuotes(res.data);
      console.log(quotes);
      const uniqueAuthors = [...new Set(res.data.map((quote) => quote.author))];
      setAuthors(uniqueAuthors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <select className="p-4 bg-orange-400 rounded-lg mb-6 max-w-96">
        <option value="none" disabled selected hidden>
          Auteur
        </option>
        {authors.map((author, index) => (
          <option key={index} value={author}>
            {author}
          </option>
        ))}
      </select>
    </>
  );
}

export default ChooseAuthor;
