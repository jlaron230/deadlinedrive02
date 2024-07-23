import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/solid"

function ChooseAuthor({ selectedAuthor, onSelectAuthor }) {
  const [quotes, setQuotes] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/quotes`);
      setQuotes(res.data);
      const uniqueAuthors = [...new Set(res.data.map((quote) => quote.author))];
      setAuthors(uniqueAuthors);
      setFilteredAuthors(uniqueAuthors);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSearchTerm(selectedAuthor);
  }, [selectedAuthor]);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    if (searchValue) {
      setFilteredAuthors(
        authors.filter((author) =>
          author.toLowerCase().includes(searchValue.toLowerCase())
        )
      );
    } else {
      setFilteredAuthors(authors);
    }
  };

  const handleAuthorSelect = (author) => {
    setSearchTerm(author);
    setIsDropdownOpen(false);
    onSelectAuthor(author);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleIconClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        placeholder="Sélectionner ou saisir un auteur"
        className="px-4 py-2 bg-custom-main-orange rounded-lg w-full placeholder:text-gray-800 font-semibold"
      />
      <ChevronDownIcon
          className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-2/4 cursor-pointer text-gray-600"
          onClick={handleIconClick}
        />
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full bg-custom-main-orange border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
          <li
            onClick={() => handleAuthorSelect("Non trouvé")}
            className="px-4 py-2 hover:bg-orange-300 cursor-pointer text-white"
          >
            Non trouvé
          </li>
          {filteredAuthors.map((author, index) => (
            <li
              key={index}
              onClick={() => handleAuthorSelect(author)}
              className="px-4 py-2 hover:bg-orange-300 cursor-pointer"
            >
              {author}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}

export default ChooseAuthor;
