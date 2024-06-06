const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(`INSERT INTO ${this.table} 
      (firstName, lastName, email, password, birthday) 
      VALUES (?, ?, ?, ?, ?)`, [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.birthday
    ]);
  }

  update(user) {
    return this.database.query(
      `UPDATE ${this.table} SET 
      firstName = ?, 
      lastName = ?, 
      email = ?, 
      password = ?, 
      birthday = ? 
      WHERE id = ?`,
      [user.firstName, user.lastName, user.email, user.password, user.birthday, user.id]
    );
  }
}

module.exports = UserManager;

module.exports = UserManager;
