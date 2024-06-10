const AbstractManager = require("./AbstractManager");

class Quote_Category extends AbstractManager {
  constructor() {
    super({ table: "quote_category" });
  }

  insert(quote_category) {
    return this.database.query(`insert into ${this.table} (title) values (?)`, [
        quote_category.title,
    ]);
  }
  

  update(quote_category) {
    return this.database.query(
      `update ${this.table} set title = ? where id = ?`,
      [quote_category.title, quote_category.id]
    );
  }
}

module.exports = Quote_Category;