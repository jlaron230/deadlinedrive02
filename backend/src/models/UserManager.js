const AbstractManager = require("./AbstractManager"); // Import the AbstractManager class

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" }); // Call the constructor of the AbstractManager with the table name "user"
  }

  // Method to insert a new user into the database
  insert(user) {
    return this.database.query(
      `insert into ${this.table} 
      (firstName, lastName, email, password, birthday) 
      values (?, ?, ?, ?, ?)`, // SQL query to insert a new user
      [
        user.firstName,
        user.lastName,
        user.email,
        user.password,
        user.birthday
      ] // Array of values to be inserted
    );
  }
  
  // Method to update an existing user in the database
  update(user) {
    return this.database.query(
      `update ${this.table} SET 
      firstName = ?, 
      lastName = ?, 
      email = ?, 
      password = ?, 
      birthday = ?
      where id = ?`, // SQL query to update a user
      [
        user.firstName, 
        user.lastName, 
        user.email, 
        user.password, 
        user.birthday, 
        user.id
      ] // Array of values to be updated and the user ID
    );
  }
}

module.exports = UserManager; // Export the UserManager class
