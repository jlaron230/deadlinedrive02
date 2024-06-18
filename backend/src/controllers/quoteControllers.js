const models = require("../models");
const { validationResult } = require("express-validator");

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

    try {
        await models.quote.update(quote);
        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        if (error.message === "Invalid data." || error.message === "No fields have been modified.") {
            res.status(400).send({ error: error.message });
        } else {
            res.sendStatus(500);
        }
    }
};

const add = async (req, res) => {
    // FIXME const errors = validationResult(req);
    // console.log(errors);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() }); // Bad Request
    // }
    const quote = req.body;
    try {
        const [result] = await models.quote.insert(quote);
        const quoteId = result.insertId;

        if (quote.id_category) {
            await models.quote_category.insert({ id_quote: quoteId, id_category: quote.category_id });
        }

        res.location(`quotes/${quoteId}`).sendStatus(201);
    } catch (error) {
        console.error("Error when adding quotes : ", error);
        res.sendStatus(500);
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
