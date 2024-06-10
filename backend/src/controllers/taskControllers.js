const models = require("../models");
const { validationResult } = require('express-validator');

// Fetch all tasks from the database
const browse = async (req, res) => {
  try {
    const [rows] = await models.task.findAll();
    res.send(rows);
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal Server Error
  }
};

// Fetch a specific task by its ID
const read = async (req, res) => {
  try {
    const [rows] = await models.task.find(req.params.id);
    if (!rows.length) {
      return res.sendStatus(404); // Not Found
    }
    res.send(rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal Server Error
  }
};

// Update a specific task by its ID
const edit = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Bad Request
  }

  const task = req.body;
  task.id = parseInt(req.params.id, 10);
  task.id_user = req.user.id; // Associate task with the current user

  try {
    const [result] = await models.task.update(task);
    if (result.affectedRows === 0) {
      return res.sendStatus(404); // Not Found
    }
    res.sendStatus(204); // No Content
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal Server Error
  }
};

// Add a new task to the database
const add = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Bad Request
  }

  const task = req.body;
  task.id_user = req.user.id; // Associate task with the current user

  try {
    const [result] = await models.task.insert(task);
    res.location(`/tasks/${result.insertId}`).sendStatus(201); // Created
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal Server Error
  }
};

// Delete a specific task by its ID
const destroy = async (req, res) => {
  try {
    const [result] = await models.task.delete(req.params.id);
    if (result.affectedRows === 0) {
      return res.sendStatus(404); // Not Found
    }
    res.sendStatus(204); // No Content
  } catch (err) {
    console.error(err);
    res.sendStatus(500); // Internal Server Error
  }
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
