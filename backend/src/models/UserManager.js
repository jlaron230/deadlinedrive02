const AbstractManager = require("./AbstractManager"); // Import the AbstractManager class

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" }); // Call the constructor of the AbstractManager with the table name "user"
  }

  // Method to insert a new user into the database
  insert(user) {
    return this.database.query(
      `insert into ${this.table} 
      (firstName, lastName, email, password) 
      values (?, ?, ?, ?)`, // SQL query to insert a new user
      [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
      ] // Array of values to be inserted
    );
  }
  
  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET firstName = ?, lastName = ?, email = ? WHERE id = ?`,
      [user.firstName, user.lastName, user.email, user.id]
    ).then(([result]) => result); // return a good result
  }

  
  // Method to find a user by their email
  findUserByEmail(email) {
    return this.database.query(
      `select * from ${this.table} where email = ?`, // SQL query to find a user by email
      [email] // Array of values to be used in the query
    );
  }

  // Method to modify the user's password in the database
   modifyPassword(id, hashPassword){
     return this.database.query(
       `UPDATE ${this.table} SET password = ? WHERE id = ?`,
       [hashPassword, id] // Parameters to replace the placeholders in the query
     );
   }

   // Method to find a user by their ID
   findById(id) {
    // Execute an SQL query to select all fields from the table for the user with the specified ID
    return this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    ).then(results => results[0]);
  }


}

module.exports = UserManager; // Export the UserManager class
