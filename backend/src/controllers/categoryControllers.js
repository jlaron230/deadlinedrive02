
const models = require("../models"); // Import the models from the specified path

// Function to handle browsing (getting all categories)
const browse = (req, res) => {
  models.category
    .findAll() // Find all categories
    .then(([rows]) => {
      res.send(rows); // Send the rows as the response
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.sendStatus(500); // Send a 500 Internal Server Error status
    });
};

// Function to handle reading a specific category by ID
const read = (req, res) => {
  models.category
    .find(req.params.id) // Find a category by the provided ID
    .then(([row]) => {
      if (!row) {
        res.sendStatus(404); // Send a 404 Not Found status if category is not found
      } else {
        res.send(row); // Send the category data as the response
      }
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.sendStatus(500); // Send a 500 Internal Server Error status
    });
};

// Function to handle editing a category's information
const edit = (req, res) => {
  const category = req.body; // Get the category data from the request body

  // TODO: Add validations for category data (length, format, etc.)

  category.id = parseInt(req.params.id, 10); // Parse the category ID from the request parameters

  models.category
    .update(category) // Update the category information
    .then((result) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Send a 404 Not Found status if no rows were affected
      } else {
        res.sendStatus(204); // Send a 204 No Content status on success
      }
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.sendStatus(500); // Send a 500 Internal Server Error status
    });
};

// Function to handle adding a new category
const add = (req, res) => {
  const category = req.body; // Get the category data from the request body

  // TODO: Add validations for category data (length, format, etc.)

  models.category
    .insert(category) // Insert a new category
    .then((result) => {
      res.location(`/categories/${result.insertId}`).sendStatus(201); // Set the Location header and send a 201 Created status
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.sendStatus(500); // Send a 500 Internal Server Error status
    });
};

// Function to handle deleting a category by ID
const destroy = (req, res) => {
  models.category
    .delete(req.params.id) // Delete the category by the provided ID
    .then((result) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Send a 404 Not Found status if no rows were affected
      } else {
        res.sendStatus(204); // Send a 204 No Content status on success
      }
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.sendStatus(500); // Send a 500 Internal Server Error status
    });
};

// Export the functions for use in other parts of the application
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};