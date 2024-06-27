const AbstractManager = require("./AbstractManager");

const TABLE_NAME = "comment";
const FIELDS = ["id", "content", "created_at", "updated_at", "id_user", "id_quote"];

class CommentManager extends AbstractManager {
    constructor() {
        super({ table: TABLE_NAME }); // Initialize the base class with the table name for the comments.
    }

    // Inserts a new comment into the database
    insert(comment) {
        let { content, id_user, id_quote } = comment;
        const created_at = new Date(); // Set the created_at time to the current time
        const updated_at = new Date(); // Set the updated_at time to the current time

        // Execute an SQL query to insert the new comment into the database
        return this.database.query(
            `INSERT INTO ${TABLE_NAME} (content, created_at, updated_at, id_user, id_quote) VALUES (?, ?, ?, ?, ?)`,
            [content, created_at, updated_at, id_user, id_quote]
        );
    }

    // Updates an existing comment in the database
    update(comment) {
        if (!comment.id) {
            throw new Error("ID is required to update."); // Ensure there is an ID to update the comment
        }

        const fields = []; // Array to hold SQL fields for update
        const values = []; // Array to hold values for the fields

        // Iterate over the predefined fields to build the update query dynamically
        for (const field of FIELDS) {
            if (comment[field] !== undefined) { // Check if the field is present in the comment object
                fields.push(`${field} = ?`); // Add SQL set operation
                values.push(comment[field]); // Add value to be set
            }
        }

        if (fields.length === 0) {
            throw new Error("No fields have been modified."); // Throw error if no fields are modified
        }

        // Build the SQL query string
        const query = `UPDATE ${TABLE_NAME} SET ${fields.join(", ")} WHERE id = ?`;
        values.push(comment.id); // Add the comment's ID to the values array for the WHERE clause

        // Execute the update query
        return this.database.query(query, values);
    }

    // Deletes a comment from the database
    delete(id) {
        // Execute an SQL query to delete the comment by its ID
        return this.database.query(
            `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
            [id]
        );
    }

    // Fetches comments associated with a specific quote ID
    findByQuoteId(quoteId) {
        // Execute an SQL query to find all comments by the quote ID
        return this.database.query(
            `SELECT * FROM ${TABLE_NAME} WHERE id_quote = ?`,
            [quoteId]
        );
    }
}

module.exports = CommentManager;
