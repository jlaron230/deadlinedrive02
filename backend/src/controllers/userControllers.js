const models = require("../models");

// Function to get all users
const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows); // Send the retrieved rows as the response
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Send a 500 status on error
    });
};

// Function to get a user by ID
const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404); // Send a 404 status if no user is found
      } else {
        res.send(rows[0]); // Send the found user as the response
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Send a 500 status on error
    });
};

// Function to update a user by ID
const edit = (req, res) => {
  const user = req.body;
  user.id = parseInt(req.params.id, 10);

  models.user
    .update(user)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Send a 404 status if no user was updated
      } else {
        res.sendStatus(204); // Send a 204 status to indicate success
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Send a 500 status on error
    });
};

// Function to add a new user
const add = async (req, res) => {
  try {
    const user = req.body;
    const result = await models.user.insert(user);
    // Send a 201 status with a JSON response including the user ID and a success message
    res.status(201).location(`/users/${result.insertId}`).json({ id: result.insertId, message: "User created successfully" });
  } catch(err) {
    console.error(err);
    res.sendStatus(500); // Send a 500 status on error
  }
};

// Function to delete a user by ID
const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Send a 404 status if no user was deleted
      } else {
        res.sendStatus(204); // Send a 204 status to indicate success
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500); // Send a 500 status on error
    });
};

// Function to get a user by email and pass the user to the next middleware
const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;
  models.user
    .findUserByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        const [firstUser] = users;
        req.user = firstUser; // Attach the user to the request object
        next(); // Call the next middleware
      } else {
        res.sendStatus(401); // Send a 401 status if no user is found
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database"); // Send a 500 status on error
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
};
