const models = require("../models");

const browse = async (req, res) => {
    try {
        const [rows] = await notificationManager.findAll();
        res.send(rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving notifications");
    }
};

const read = async (req, res) => {
    try {
        const [rows] = await notificationManager.find(req.params.id);
        if (rows.length === 0) {
            res.sendStatus(404);
        } else {
            res.send(rows[0]);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error retrieving notification");
    }
};

const edit = async (req, res) => {
    try {
        const [result] = await notificationManager.markAsRead(req.params.id);
        if (result.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error updating notification");
    }
};

const add = async (req, res) => {
    try {
        const { userId, quoteId } = req.body;
        const [result] = await notificationManager.create(userId, quoteId);
        res.location(`/notifications/${result.insertId}`).sendStatus(201);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error creating notification");
    }
};

const destroy = async (req, res) => {
    try {
        const [result] = await notificationManager.delete(req.params.id);
        if (result.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send("Error deleting notification");
    }
};

const markAsRead = async (req, res) => {
    try {
        const result = await notificationManager.markAsRead(req.params.id);
        if (result.affectedRows > 0) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

// Ajoutez cette méthode à votre exportation de module


module.exports = {
    browse,
    read,
    edit,
    add,
    destroy,
    markAsRead,
};
