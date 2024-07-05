const models = require("../models");

// Retrieve all notifications from the database
const browse = async (req, res) => {
    try {
        const [rows] = await models.notification.findAll();
        res.send(rows);  // Send all notifications as a response
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving notifications");  // Handle errors and send a 500 status code
    }
};

// Retrieve a specific notification by its ID
const read = async (req, res) => {
    try {
        const [rows] = await models.notification.find(req.params.id);
        if (rows.length === 0) {
            res.sendStatus(404);  // If no notification is found, send a 404 status
        } else {
            res.send(rows[0]);  // Send the found notification
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving notification");
    }
};

// Update a notification's status to mark it as read
const edit = async (req, res) => {
    try {
        const [result] = await models.notification.markAsRead(req.params.id);
        if (result.affectedRows === 0) {
            res.sendStatus(404);  // If no rows are affected, the notification was not found
        } else {
            res.sendStatus(204);  // Send a 204 status indicating that the update was successful without sending any content
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating notification");
    }
};

// Create a new notification with provided user ID and quote ID
const add = async (req, res) => {
    try {
        const { userId, quoteId } = req.body;
        const [result] = await models.notification.create(userId, quoteId);
        res.location(`/notifications/${result.insertId}`).sendStatus(201);  // Set the location header and send a 201 status
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating notification");
    }
};

// Delete a notification by its ID
const destroy = async (req, res) => {
    try {
        const [result] = await models.notification.delete(req.params.id);
        if (result.affectedRows === 0) {
            res.sendStatus(404);  // If no notification was found to delete, send a 404 status
        } else {
            res.sendStatus(204);  // If the deletion was successful, send a 204 status
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting notification");
    }
};

// Mark a notification as read and update its status in the database
const markAsRead = async (req, res) => {
    try {
        const result = await models.notification.markAsRead(req.params.id);
        if (result.affectedRows > 0) {
            res.sendStatus(200);  // OK - The resource was successfully modified
        } else {
            res.sendStatus(404);  // Not Found - The resource was not found
        }
    } catch (error) {
        console.error(error);
        res.status(500). send("Error updating notification status");
    }
};

// Retrieve all notifications for a specific user ID
const findByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const [rows] = await models.notification.findByUserId(userId);
        if (rows.length === 0) {
            res.sendStatus(404);  // If no notifications are found for the user, send a 404 status
        } else {
            res.send(rows);  // Send the found notifications for the user
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error retrieving notifications for user");
    }
};

module.exports = {
    browse,
    read,
    edit,
    add,
    destroy,
    markAsRead,
    findByUserId,
};
