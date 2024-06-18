import ChooseTheme from "@components/ChooseTheme/ChooseTheme";
import ChooseAuthor from "@components/ChooseAuthor/ChooseAuthor";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomizeQuotes() {
  const [categories, setCategories] = useState([]);
  const [quotes, setQuotes] = useState([]);
  const [newQuote, setNewQuote] = useState({ author:"", text: "", type:"" });
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchData = async () => {
    try {
      const [resCategories, resQuotes] = await Promise.all([
        axios.get("http://localhost:5000/categories"),
        axios.get("http://localhost:5000/quotes"),
      ]);
      setCategories(resCategories.data);
      setQuotes(resQuotes.data);
    } catch (error) {
      console.error("Error fetching data : ", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addQuote = async (newQuote) => {
    const id_user = 10;
    try {
      const res = await axios.post("http://localhost:5000/quotes", 
        {
        author: newQuote.author,
        text: newQuote.text,
        id_user: newQuote.id_user,
        id_category: newQuote.id_category
        });

      setQuotes([...quotes, res.data]);
      setSuccessMessage(
        "Votre citation a été postée avec succès, retrouvez-là dans vos citations postées"
      );
      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error) {
      setErrorMessage("Erreur lors de la publication de votre citation");
      setTimeout(() => setErrorMessage(""), 5000);
      console.error("Erreur de lors de l'ajout de la citation :", error);
    }
  };

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
          <form
            onSubmit={(e) => {
              addQuote(newQuote);
              e.preventDefault();
            }}
            className="flex flex-col gap-6"
          >
            <textarea
              type="text"
              value={newQuote.text}
              onChange={(e) =>
                setNewQuote({
                  ...newQuote,
                  text: e.target.value,
                })
              }
              placeholder="Personnaliser une nouvelle citation"
              className="px-4 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-gray-800 min-h-32 w-full bg-orange-400"
            />
            <ChooseAuthor
            selectedAuthor={newQuote.author}
            onSelectAuthor={(author) =>
                setNewQuote({
                    ...newQuote,
                    author: author,
                })
            }
            />
            <input
              type="text"
              placeholder="Si auteur non répertorié"
              className="px-4 py-1 border border-gray-400 rounded-md focus:outline-none focus:border-gray-800 w-full bg-orange-400"
            />
            <ChooseTheme
            selectedTheme={newQuote.id_category}
            onSelectTheme={(id_category) =>
                setNewQuote({
                    ...newQuote,
                    id_category: id_category,
            })
        }
            />
            <button
              type="submit"
              className="px-4 py-1 bg-sky-600 text-white rounded hover:bg-orange-700"
            >
              Créer
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
