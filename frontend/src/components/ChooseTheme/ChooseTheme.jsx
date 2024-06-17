import { useEffect, useState } from "react";
import axios from "axios";

function ChooseTheme() {
    const [categories, setCategories] = useState([]);
    const [quotes, setQuotes] = useState([]);

    const fetchData = async () => {
        const [resAuthors, resCategories] = await Promise.all([
            axios.get("http://localhost:5000/quotes"),
            axios.get("http://localhost:5000/categories")
        ]);
        setQuotes(resAuthors.data)
        setCategories(resCategories.data)
        console.log(`${resAuthors.data} et ${resCategories.data}`);
    }
    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="flex">
            <div className="flex flex-col space-y-6 p-6 sm:p-10">
                <h1>Créer une citation</h1>
                <select className="p-4 bg-orange-400 rounded-lg mb-6 max-w-96">
                <option value="none" disabled selected hidden>Thème</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                </select>

                <select className="p-4 bg-orange-400 rounded-lg mb-6 max-w-96">
                <option value="none" disabled selected hidden>Auteur</option>
                    {quotes.map((quote) => (
                        <option key={quote.id} value={quote.author}>
                            {quote.author}
                        </option>
                    ))}
                </select>

            </div>
        </div>
    );
}

export default ChooseTheme;