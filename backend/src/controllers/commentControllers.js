const models = require("../models");

const browse = async (req, res) => {
    try {
        let rows;
        if (req.query.quoteId) {
            // Fetch comments specific to a quote if quoteId is provided
            rows = await models.comment.findByQuoteId(req.query.quoteId);
        } else {
            // Fetch all comments if no quoteId is provided
            rows = await models.comment.findAll();
        }
        res.send(rows);
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const read = async (req, res) => {
    try {
        const comment = await models.comment.find(req.params.id);
        if (!comment) {
            res.sendStatus(404);
        } else {
            res.send(comment);
        }
    } catch (error) {
        console.error(error);
        res.sendStatus(500);
    }
};

const edit = async (req, res) => {
    const comment = req.body;
    comment.id = parseInt(req.params.id, 10);

    if (!comment.id_quote && !comment.id_user) {
        return res.status(400).send({ error: "A comment must be associated with either a quote or a user."});
    }

    try {
        await models.comment.update(comment);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

const add = async (req, res) => {
    const comment = req.body;
    try {
        const result = await models.comment.insert(comment);
        res.location(`/comments/${result.insertId}`).sendStatus(201);
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
};

const destroy = async (req, res) => {
    try {
        const result = await models.comment.delete(req.params.id);
        if (result.affectedRows === 0) {
            res.sendStatus(404);
        } else {
            res.sendStatus(204);
        }
    } catch (error) {
        console.error(error);
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
