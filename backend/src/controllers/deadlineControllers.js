const models = require("../models");

// Function to retrieve all deadlines
const browse = (req, res) => {
  models.deadline
    .findAll()
    .then(([rows]) => {
      res.send(rows); // Sends all deadlines in response
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to retrieve a specific deadline by its ID
const read = (req, res) => {
  models.deadline
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404); // Sends a 404 response if the deadline is not found
      } else {
        res.send(rows[0]); // Sends the found deadline in response
      }
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to update an existing deadline
const edit = (req, res) => {
  const deadline = req.body;

  // TODO validations (length, format...)

  deadline.id = parseInt(req.params.id, 10);

  models.deadline
    .update(deadline)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Sends a 404 response if the deadline to be updated is not found
      } else {
        res.sendStatus(204); // Sends a 204 response to indicate the update was successful
      }
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to add a new deadline
const add = (req, res) => {
  const deadline = req.body;

  // TODO validations (length, format...)

  models.deadline
    .insert(deadline)
    .then(([result]) => {
      res.location(`/deadlines/${result.insertId}`).sendStatus(201); // Sends a 201 response with the location of the new deadline
    })
    .catch((err) => {
      console.error(err); // Logs the error to the console
      res.sendStatus(500); // Sends a server error response
    });
};

// Function to delete an existing deadline by its ID
const destroy = (req, res) => {
  models.deadline
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404); // Sends a 404 response if the deadline to be deleted is not found
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
  browse,  
  read,    
  edit,    
  add,     
  destroy, 
};
