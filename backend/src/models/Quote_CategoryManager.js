const AbstractManager = require("./AbstractManager");

class Quote_Category extends AbstractManager {
  constructor() {
    super({ table: "quote_category" });
  }
  // Function to insert a new record into the quote_category join table
  insert(id_quote, id_category) {
    return this.database.query(
      `INSERT INTO ${this.table} (id_quote, id_category) VALUES (?, ?)`,
      [id_quote, id_category]
    );
  }

  // Function to delete a record from the quote_category join table
  delete(id_quote, id_category) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE id_quote = ? AND id_category	 = ?`,
      [id_quote, id_category]
    );
  }

  // Function to find categories by quote ID
  findCategoriesByQuoteId(id_quote) {
    return this.database.query(
      `SELECT c.* FROM categories c 
       JOIN ${this.table} qc ON c.id = qc.id_category	 
       WHERE qc.id_quote = ?`,
      [id_quote]
    );
  }

  // Function to find quotes by category ID
  findQuotesByCategoryId(id_category	) {
    return this.database.query(
      `SELECT q.* FROM quotes q 
       JOIN ${this.table} qc ON q.id = qc.id_quote
       WHERE qc.id_category	 = ?`,
      [id_category	]
    );
  }
}

module.exports = Quote_Category;