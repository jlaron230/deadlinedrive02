const AbstractManager = require("./AbstractManager");

class QuoteCategory extends AbstractManager {
  constructor() {
    super({ table: "quote_category" });
  }

  // Function to insert a new quote category into the database
  insert(quote_category) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
      quote_category.title,
    ]);
  }

  // Function to update an existing quote category in the database
  update(quote_category) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [quote_category.title, quote_category.id]
    );
  }
}

module.exports = QuoteCategory;
