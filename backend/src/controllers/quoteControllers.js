const models = require("../models");

const browse = async (req, res) => {
    try {
        const [rows] = await models.quote.findAll();
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const read = async (req, res) => {
    try {
        const [rows] = await models.quote.find(req.params.id);
        if (rows[0] == null) {
            res.sendStatus(404);
        } else {
            res.send(rows[0]);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const edit = async (req, res) => {
    const quote = req.body;
    quote.id = parseInt(req.params.id, 10);
    quote.id_user = req.user.id;

    try {
        await models.quote.update(quote);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        if (error.message === "Donnée invalide." || error.message === "Aucun champ n'a été modifié.") {
            res.status(400).send({ error: error.message });
        } else {
            res.sendStatus(500);
        }
    }
};

const add = async (req, res) => {
    const quote = req.body;
    quote.id_user = req.user.id;

    try {
        const [result] = await models.quote.insert(quote);
        res.location(`quotes/${result.insertId}`).sendStatus(201);
    } catch (error) {
        console.error(error);
        if (error.message === "Donnée invalide.") {
            res.status(400).send({ error: error.message });
        } else {
            res.sendStatus(500);
        }
    }
};

const destroy = async (req, res) => {
    try {
        const [result] = await models.quote.delete(req.params.id);
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

module.exports = {
    browse,
    read,
    edit,
    add,
    destroy,
};
