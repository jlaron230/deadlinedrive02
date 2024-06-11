const models = require("../models"); // Import the models from the specified path
const hashPassword = require("../auth");

// Function to handle browsing (getting all users)
const browse = (req, res) => {
  models.user
    .findAll() // Find all users
    .then(([rows]) => {
      res.send(rows); // Send the rows as the response
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.sendStatus(500); // Send a 500 Internal Server Error status
    });
};

// Function to handle reading a specific user by ID
const read = (req, res) => {
  models.user
    .find(req.params.id) // Find a user by the provided ID
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404); // Send a 404 Not Found status if user is not found
      } else {
        res.send(rows[0]); // Send the user data as the response
      }
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.sendStatus(500); // Send a 500 Internal Server Error status
    });
};

// Function to handle editing a user's information
const edit = (req, res) => {
  const user = req.body; // Get the user data from the request body

  // TODO: Add validations for user data (length, format, etc.)

  user.id = parseInt(req.params.id, 10); // Parse the user ID from the request parameters

  models.user
    .update(user) // Update the user information
    .then(([result]) => {
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

// Function to handle adding a new user
const add = async(req, res) => {
  const user = req.body; // Get the user data from the request body

  // TODO: Add validations for user data (length, format, etc.)
  const hashedPassword = await hashPassword(user.password);
  console.log(hashedPassword);
  user.password = hashedPassword;

  models.user
    .insert(user) // Insert a new user
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201); // Set the Location header and send a 201 Created status
    })
    .catch((err) => {
      console.error(err); // Log the error to the console
      res.sendStatus(500); // Send a 500 Internal Server Error status
    });
};

// Function to handle deleting a user by ID
const destroy = (req, res) => {
  models.user
    .delete(req.params.id) // Delete the user by the provided ID
    .then(([result]) => {
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