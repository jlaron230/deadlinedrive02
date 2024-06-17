import ChooseTheme from "@components/ChooseTheme/ChooseTheme";
import ChooseAuthor from "@components/ChooseAuthor/ChooseAuthor";
import { useState } from "react";

export default function CustomizeQuotes() {
    const [categories, setCategories] = useState([]);
    const [quotes, setQuotes] = useState([]);
    const [newQuote, setNewQuote] = useState({ text: "" });
    const [newAuthor, setNewAuthor] = useState({ author: "" });
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const fetchData = async () => {
        try {
        const [resCategories, resQuotes] = await Promise.all([
            axios.get("http://localhost:5000/categories"),
            axios.get("http://localhost:5000/quotes")
        ]);
        setCategories(resCategories.data);
        setQuotes(resQuotes.data);
        } catch (error) {
            console.error("Error fetching data : ", error);
        }
    }
    
  return (
    <>
      <div className="flex">
        <div className="flex flex-col space-y-6 p-6 sm:p-10">
          <h1>Créer une citation</h1>
          {successMessage && (
              <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
                {errorMessage}
              </div>
            )}
          <ChooseAuthor />
          <ChooseTheme />
        </div>
      </div>
    </>
  );
}
