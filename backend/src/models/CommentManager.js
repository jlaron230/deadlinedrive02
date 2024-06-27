const AbstractManager = require("./AbstractManager");

const TABLE_NAME = "comment";
const FIELDS = ["id", "content", "created_at", "updated_at", "id_user", "id_quote"];

class CommentManager extends AbstractManager {
    constructor() {
        super({ table: TABLE_NAME });
    }

    insert(comment) {
        let { content, id_user, id_quote } = comment;
        const created_at = new Date();
        const updated_at = new Date();

        return this.database.query(
            `INSERT INTO ${TABLE_NAME} (content, created_at, updated_at, id_user, id_quote) VALUES (?, ?, ?, ?, ?)`,
            [content, created_at, updated_at, id_user, id_quote]
        );
    }

    update(comment) {
        if (!comment.id) {
            throw new Error("ID is required to update.");
        }

        const fields = [];
        const values = [];

        for (const field of FIELDS) {
            if (comment[field] !== undefined) {
                fields.push(`${field} = ?`);
                values.push(comment[field]);
            }
        }

        if (fields.length === 0) {
            throw new Error("No fields have been modified.");
        }

        const query = `UPDATE ${TABLE_NAME} SET ${fields.join(", ")} WHERE id = ?`;
        values.push(comment.id);
        return this.database.query(query, values);
    }

    delete(id) {
        return this.database.query(
            `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
            [id]
        );
    }

    findByQuoteId(quoteId) {
        return this.database.query(
            `SELECT * FROM ${TABLE_NAME} WHERE id_quote = ?`,
            [quoteId]
        );
    }
}

module.exports = CommentManager;
