const AbstractManager = require("./AbstractManager"); // Import the AbstractManager class

class CategoryManager extends AbstractManager {
  constructor() {
    super({ table: "category" }); // Call the constructor of the AbstractManager with the table name "category"
  }

  // Method to insert a new category into the database
  insert(category) {
    return this.database.query(
      `insert into ${this.table} (name) values (?)`, // SQL query to insert a new category
      [category.name] // Array of values to be inserted (only category name)
    );
  }

  // Method to update an existing category in the database
  update(category) {
    return this.database.query(
      `update ${this.table} set name = ? where id = ?`, // SQL query to update a category
      [category.name, category.id] // Array of values to be updated (category name and ID)
    );
  }
}

module.exports = CategoryManager; // Export the CategoryManager class
