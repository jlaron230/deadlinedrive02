const models = require("../models");

// Function to retrieve all quote_category
const browse = (req, res) => {
  models.quote_category
    .findAll()
    .then(([rows]) => {
      res.send(rows); // Sends all quote_category in response
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to retrieve a specific quote_category by its ID
const read = (req, res) => {
  models.quote_category
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404); // Sends a 404 response if the quote_category is not found
      } else {
        res.send(rows[0]); // Sends the found quote_category in response
      }
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to update an existing quote_category
const edit = async (req, res) => {
  const quote_category = req.body;
  const id_quote = parseInt(req.params.id_quote, 10); // Récupérez l'id_quote depuis les paramètres
  const id_category = parseInt(req.params.id_category, 10); // Récupérez l'id_category depuis les paramètres

  // Validez et mettez à jour les données en utilisant id_quote et id_category
  try {
    await models.quote_category.update({ id_quote, id_category, ...quote_category });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};


// Function to add a new quote_category
const add = async (req, res) => {
  const quote_category = req.body;

  // Assurez-vous que vous avez les bonnes valeurs pour id_quote et id_category
  const id_quote = quote_category.id_quote;
  const id_category = quote_category.id_category;

  try {
    await models.quote_category.insert(id_quote, id_category);
    res.sendStatus(201);
  } catch (error) {
    console.error("Erreur lors de l'ajout : ", error);
    res.sendStatus(500);
  }
};


// Function to delete an existing quote_category by its ID
const destroy = (req, res) => {
  models.quote_category
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Sends a 404 response if the quote_category to be deleted is not found
      } else {
        res.sendStatus(204); // Sends a 204 response to indicate the deletion was successful
      }
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

module.exports = {
  browse,  // Exports the browse function
  read,    // Exports the read function
  edit,    // Exports the edit function
  add,     // Exports the add function
  destroy, // Exports the destroy function
};