import { useEffect, useState } from "react";
import axios from "axios";

function ChooseTheme() {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/categories");
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <select className="p-4 bg-orange-400 rounded-lg mb-6 max-w-96">
      <option value="none" disabled selected hidden>
        Choisir un thème
      </option>
      {categories.map((category) => (
        <option key={category.id} value={category.name}>
          {category.name}
        </option>
      ))}
    </select>
    </>
  );
}

export default ChooseTheme;
