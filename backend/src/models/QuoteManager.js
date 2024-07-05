const AbstractManager = require("./AbstractManager");

const TABLE_NAME = "quote";
const FAVORITES_TABLE = "favorites";
const FIELDS = ["author", "type", "text", "vote", "id_user"];

class QuoteManager extends AbstractManager {
  constructor() {
    super({ table: TABLE_NAME });
  }

  validateQuote(quote) {
    // REVIEW the development phase requires that testing be done only on a certain type of restrictions
    // if (typeof quote.author !== 'string' || typeof quote.text !== 'string' || typeof quote.vote !== 'number' || typeof quote.id_user !== 'number') {
    if (typeof quote.text !== "string") {
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
    // Check if the quote object has an ID. If not, throw an error.
    if (!quote.id) {
      throw new Error("ID is required to update.");
    }
    // Validate the quote object using the validateQuote method.
    if (!this.validateQuote(quote)) {
      throw new Error("Invalid data.");
    }
    // Initialize arrays to store the fields and values to be updated.
    const fields = [];
    const values = [];

    // If the quote has a value for a field, add the field and its value to the arrays.
    for (const field of FIELDS) {
      if (quote[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(quote[field]);
      }
    }

    // If no fields have been modified, throw an error.
    if (fields.length === 0) {
      throw new Error("No fields have been modified.");
    }

    // Add the quote ID to the values array.
    values.push(quote.id);
    const query = `UPDATE ${TABLE_NAME} SET ${fields.join(", ")} WHERE id = ?`;
    return this.database.query(query, values);
  }

  delete(id) {
    try {
      return this.database.query(`DELETE FROM ${this.table} WHERE id = ?`, [
        id,
      ]);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Method to add a quote to user's favorites
  async addFavorite(userId, quoteId) {
    try {
    // Execute an SQL query to insert the favorite into the 'favorites' table
      const result = await this.database.query(
        `INSERT INTO favorites (id_user, id_quote) VALUES (?, ?)`,
        [userId, quoteId]
      );

    // Return the result of the query execution
      return result;
    } catch (error) {
      console.error("Error when adding favorite to the database:", error);
      throw error;
    }
  }

  // Method to check if a quote is favorited by a user
  async checkFavorite(userId, quoteId) {
    try {
     // Execute an SQL query to select records from 'favorites' table based on user ID and quote ID
      const [rows] = await this.database.query(
        `SELECT * FROM favorites WHERE id_user = ? AND id_quote = ?`,
        [userId, quoteId]
      );

      // Return the result rows from the query
      return rows;
    } catch (error) {
      console.error("Error when checking favorite from the database:", error);
      throw error;
    }
  }
    // Method to find all favorite quotes of a specific user
  findFavorites(userId) {
    // Execute an SQL query to select favorite quotes from 'favorites' table joined with 'quotes' table
    return this.database.query(
      `SELECT q.* FROM ${FAVORITES_TABLE} f JOIN ${TABLE_NAME} q ON f.id_quote = q.id WHERE f.id_user = ?`,
      [userId]
    );
  }

  // Method to remove a quote from favorites
  removeFavorite(userId, quoteId) {

    // Execute an SQL query to delete the favorite entry from 'favorites' table
    return this.database.query(
      `DELETE FROM ${FAVORITES_TABLE} WHERE id_user = ? AND id_quote = ?`,
      [userId, quoteId]
    );
  }
}

module.exports = QuoteManager;
