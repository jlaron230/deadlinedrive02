const AbstractManager = require("./AbstractManager");

const TABLE_NAME = "quote";
const FIELDS = ["author", "type", "text", "vote", "id_user"];

class QuoteManager extends AbstractManager {
    constructor() {
        super({ table: TABLE_NAME });
    }

    validateQuote(quote) {
        // REVIEW the development phase requires that testing be done only on a certain type of restrictions
        // if (typeof quote.author !== 'string' || typeof quote.text !== 'string' || typeof quote.vote !== 'number' || typeof quote.id_user !== 'number') {
            if (typeof quote.text !== 'string') {
            return false;
        }
        return true;
    }

    insert(quote) {
        if (!this.validateQuote(quote)) {
            throw new Error("Invalid data.");
        }
        // REVIEW the development phase requires that testing be done only on a certain type of restrictions
        const { author, text, id_user } = quote;
        return this.database.query(
            `INSERT INTO ${TABLE_NAME} (author, text, vote, id_user) VALUES (?, ?, ?, ?)`,
            [author, text, 0, id_user]
        );

    }

    update(quote) {
        if (!quote.id) {
            throw new Error("ID is required to update.");
        }

        if (!this.validateQuote(quote)) {
            throw new Error("Invalid data.");
        }

        const fields = [];
        const values = [];
        
        for (const field of FIELDS) {
            if (quote[field] !== undefined) {
                fields.push(`${field} = ?`);
                values.push(quote[field]);
            }
        }

        if (fields.length === 0) {
            throw new Error("No fields have been modified.");
        }

        values.push(quote.id);
        const query = `UPDATE ${TABLE_NAME} SET ${fields.join(", ")} WHERE id = ?`;
        return this.database.query(query, values);
    }


    // Fetch a random quote
    getRandomQuote() {
        return this.database.query(
            `SELECT * FROM ${this.table} ORDER BY RAND() LIMIT 1`
        );
    }

    delete(id) {
        try {
            return this.database.query(
                `DELETE FROM ${this.table} WHERE id = ?`,
                [id]
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}


module.exports = QuoteManager;
