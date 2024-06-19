import { useEffect, useState } from "react";
import axios from "axios";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

function ChooseTheme({ selectedTheme, onSelectTheme }) {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
      setFilteredCategories(categories);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    if (searchValue) {
        setFilteredCategories(
            categories.filter((category) =>
                category.name.toLowerCase().includes(searchValue.toLowerCase())
        )
    );
    } else {
        setFilteredCategories(categories);
    }
  };

  const handleCategorySelect = (category) => {
    setSearchTerm(category.name);
    setIsDropdownOpen(false);
    onSelectTheme(category.id);
  };

  const handleInputFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleIconClick = () => {
    setIsDropdownOpen((prev) => !prev);
    if (!isDropdownOpen) {
      setFilteredCategories(categories);
    }
  };

  return (
    <>
    <div className="relative max-w-96">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onFocus={handleInputFocus}
        placeholder="Choisir un thème"
        className="px-4 py-2 bg-orange-400 rounded-lg w-96 placeholder:text-gray-800 font-semibold"
      />
      <ChevronDownIcon
          className="h-5 w-5 absolute right-3 top-1/2 transform -translate-y-2/4 cursor-pointer text-gray-600"
          onClick={handleIconClick}
        />
      {isDropdownOpen && (
        <ul className="absolute z-10 w-full bg-orange-400 border border-gray-300 rounded-lg max-h-60 overflow-y-auto">
          {filteredCategories.map((category) => (
            <li
              key={category.id}
              onClick={() => handleCategorySelect(category)}
              className="px-4 py-2 hover:bg-orange-300 cursor-pointer"
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
}

export default ChooseTheme;
