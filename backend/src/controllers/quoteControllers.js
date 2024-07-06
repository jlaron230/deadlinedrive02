const models = require("../models");

// Function to fetch and return all quotes
const browse = async (req, res) => {
  try {
    // Attempt to find all quotes in the database using the `findAll` method from the `models.quote` object
    const [rows] = await models.quote.findAll();

    // Send the fetched quotes as the response
    res.send(rows);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

// Function to read a specific quote by its ID
const read = async (req, res) => {
  try {
    // Attempt to find the quote in the database using the `find` method from the `models.quote` object
    const [rows] = await models.quote.find(req.params.id);

    // If no quote is found (rows[0] is null), send a 404 Not Found status
    if (rows[0] == null) {
      res.sendStatus(404);
    } else {
      // If a quote is found, send the quote as the response
      res.send(rows[0]);
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const edit = async (req, res) => {
  // Extract the quote data from the request body
  const quote = req.body;
  // Set the ID of the quote from the request parameters
  quote.id = parseInt(req.params.id, 10);

  try {
    // Attempt to update the quote in the database using the `update` method from the `models.quote` object
    await models.quote.update(quote, { where: { id: quote.id }});
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    // If the error message indicates invalid data or no fields modified, send a 400 Bad Request status
    if (
      error.message === "Invalid data." ||
      error.message === "No fields have been modified."
    ) {
      res.status(400).send({ error: error.message });
    } else {
      res.sendStatus(500);
    }
  }
};

// Function to add a new quote
const add = async (req, res) => {
  const quote = req.body;
  try {
    const [quoteResult] = await models.quote.insert(quote);
    const quoteId = quoteResult.insertId;

    if (quote.id_category) {
      await models.quote_category.insert(quoteId, quote.id_category);
    }

    // Set the location header to the newly created quote's URL and send a 201 Created status
    res.location(`quotes/${quoteId}`).sendStatus(201);
  } catch (error) {
    console.error("Error when adding quotes : ", error);
    res.sendStatus(500);
  }
};

// Function to delete a quote by its ID
const destroy = async (req, res) => {
  try {
    // Attempt to delete the quote from the database using the ID from the request parameters
    const [result] = await models.quote.delete(req.params.id);

    // Check if any rows were affected (i.e., if the quote was found and deleted)
    if (result.affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const getDailyQuote = async (req, res) => {
    try {
        const [rows] = await models.quote.getRandomQuote();
        if (rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).send('No quote available');
        }
    } catch (error) {
        console.error('Error fetching a random quote:', error);
        res.status(500).send('Error retrieving a random quote');
    }
};

const addFavorite = async (req, res) => {
  const { id_user, id_quote } = req.body;

  try {
    // Vérifiez les valeurs reçues
    console.log("Received id_user:", id_user);
    console.log("Received id_quote:", id_quote);

    // Assurez-vous que les valeurs sont définies
    if (!id_user || !id_quote) {
      console.log("id_user or id_quote is missing");
      return res
        .status(400)
        .json({ message: "id_user and id_quote are required" });
    }

    // Vérifiez si la citation est déjà en favoris pour cet utilisateur
    const existingFavorites = await models.quote.checkFavorite(
      id_user,
      id_quote
    );

    console.log("Existing favorites:", existingFavorites);

    if (existingFavorites.length > 0) {
      // La citation est déjà en favoris
      return res.status(409).json({ message: "Quote is already in favorites" });
    }

    // Ajouter la citation aux favoris
    const result = await models.quote.addFavorite(id_user, id_quote);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error when adding favorite:", error);
    res.sendStatus(500);
  }
};

// Function to get the favorite quotes of a user
const getFavorites = async (req, res) => {
  const userId = req.params.id;

  // Check if user ID is provided
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Retrieve favorite quotes for the user from the database
    const [rows] = await models.quote.findFavorites(userId);

    // Check if any favorite quotes were found
    if (rows.length === 0) {
      res.sendStatus(404);
    } else {
      res.json(rows);
    }
  } catch (error) {
    console.error("Error when fetching favorites:", error);
    res.sendStatus(500);
  }
};

// Function to remove a favorite quote for a user
const removeFavorite = async (req, res) => {
  const { id_user, id_quote } = req.body;

  try {
    // Attempt to remove the favorite quote from the database
    const result = await models.quote.removeFavorite(id_user, id_quote);

    // Check if any rows were affected (i.e., if the favorite was found and removed)
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Favorite not found" });
    }
    res.status(200).json({ message: "Favorite removed successfully" });
  } catch (error) {
    console.error("Error when removing favorite:", error);
    res.sendStatus(500);
  }
};


const findByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log('Fetching quotes for userId:', userId);
    const quotes = await models.quote.getByIdUser(userId);
    console.log('Fetched quotes:', quotes);
    res.status(200).json(quotes);
  } catch (error) {
    console.error('Erreur lors de la récupération des citations par utilisateur:', error);
    res.sendStatus(500);
  }
}

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  addFavorite,
  getFavoritesById: getFavorites,
  removeFavorite,
  findByUser,
  getDailyQuote,
};
