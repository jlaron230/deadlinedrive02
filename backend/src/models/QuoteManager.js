const AbstractManager = require("./AbstractManager");

const TABLE_NAME = "quote";
const FIELDS = ["author", "type", "text", "vote", "id_user"];

class QuoteManager extends AbstractManager {
    constructor() {
        super({ table: TABLE_NAME });
    }

    validateQuote(quote) {
        if (typeof quote.text !== 'string') {
            return false;
        }
        return true;
    }

    insert(quote) {
        if (!this.validateQuote(quote)) {
            throw new Error("Invalid data.");
        }
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

    incrementVote(quoteId) {
        return this.database.query(
          `UPDATE ${this.table} SET vote = vote + 1 WHERE id = ?`,
          [quoteId]
        );
      }
    
      decrementVote(quoteId) {
        return this.database.query(
          `UPDATE ${this.table} SET vote = vote - 1 WHERE id = ?`,
          [quoteId]
        );
      }

      getById(quoteId) {
        return this.database.query(
            `SELECT * FROM ${this.table} WHERE id = ?`,
            [quoteId]
        );
    }

    getByIdUser(userId) {
        return this.database.query(
            `SELECT * FROM ${this.table} WHERE id_user = ?`,
            [userId]
        );
    }
}

module.exports = QuoteManager;
