const AbstractManager = require("./AbstractManager");

const TABLE_NAME = "comment";
const FIELDS = ["id", "content", "created_at", "updated_at", "id_user", "id_quote", "id_task"];

class CommentManager extends AbstractManager {
    constructor() {
        super({ table: TABLE_NAME });
    }

    validateComment(comment) {
        if (
            typeof comment.content !== "string" ||
            typeof comment.id_user !== 'number' ||
            (comment.id_quote && typeof comment.id_quote !== 'number') ||
            (comment.id_task && typeof comment.id_task !== 'number')
        ) {
            return false;
        }

        if (!(comment.created_at instanceof Date) || !(comment.updated_at instanceof Date)) {
            return false;
        }

        return true;
    }


    insert(comment) {
        if (!this.validateComment(comment)) {
            throw new Error("Invalid data.");
        }

        const { content, created_at, updated_at, id_user, id_quote, id_task } = comment;
        created_at = new Date();
        updated_at = new Date();

        return this.database.query(
            `INSERT INTO ${TABLE_NAME} (content, created_at, updated_at, id_user, id_quote, id_task) VALUES (?, ?, ?, ?, ?)`,
            [content, created_at, updated_at, id_user, id_quote, id_task]
        );
    }

    update(comment) {
        if (!comment.id) {
            throw new Error("ID is required to update.");
        }

        if (!this.validateComment(comment)) {
            throw new Error("Invalid data.");
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

        if (comment.created_at instanceof Date) {
            created_at = comment.created_at;
        } else {
            created_at = new Date();
        }

        updated_at = new Date();

        values.push(comment.id);
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
}

module.exports = CommentManager;