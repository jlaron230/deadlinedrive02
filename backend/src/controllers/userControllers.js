const models = require("../models");
const argon2 = require("argon2");

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


const edit = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const newUserDetails = req.body;

    // Vérifiez si l'utilisateur existe
    const [existingUser] = await models.user.find(userId);
    if (!existingUser) {
      return res.sendStatus(404); // Envoyer un statut 404 si aucun utilisateur n'est trouvé
    }

    // Mise à jour des informations utilisateur
    const updatedUser = {
      ...existingUser, // Inclure les informations utilisateur existantes
      ...newUserDetails, // Écraser uniquement les champs fournis dans la requête
    };

    // Si la requête contient un mot de passe, le hasher et mettre à jour le mot de passe
    if (newUserDetails.password) {
      const hashPassword = await argon2.hash(newUserDetails.password);
      updatedUser.password = hashPassword;
    }

    // Mise à jour dans la base de données
    const result = await models.user.update(updatedUser);
    if (result.affectedRows === 0) {
      return res.sendStatus(404); // Envoyer un statut 404 si aucun utilisateur n'a été mis à jour
    }

    console.log("User details updated successfully for user:", userId);
    res.sendStatus(204); // Envoyer un statut 204 pour indiquer le succès
  } catch (err) {
    console.error('Error updating user:', err);
    res.sendStatus(500); // Envoyer un statut 500 en cas d'erreur
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = parseInt(req.params.id, 10);
    const { oldPassword, newPassword } = req.body;

    // Fetch user to validate old password
    const user = await models.user.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
console.log(user.password, "user password");
    // Ensure user.password is a non-empty string
    const storedPassword = String(user.password);
    if (!storedPassword || typeof storedPassword !== 'string' || storedPassword.trim() === '') {
      return res.status(400).send('Invalid user password data');
    }
    console.log(storedPassword, "stored password");

    const validPassword = await argon2.verify(user.password, oldPassword);
    if (!validPassword) {
      return res.status(400).send('Old password is incorrect');
    }

    const hashPassword = await argon2.hash(newPassword);
    const result = await models.user.modifyPassword(userId, hashPassword);
    if (result.affectedRows === 0) {
      return res.sendStatus(404);
    }

    console.log("Password updated successfully for user:", userId);
    res.sendStatus(204);
  } catch (err) {
    console.error('Error updating password:', err);
    res.sendStatus(500);
  }
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
  changePassword,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
};
