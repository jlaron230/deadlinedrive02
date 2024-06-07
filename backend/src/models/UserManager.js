const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    return this.database.query(`insert into ${this.table} 
      (firstName, lastName, email, password, birthday) 
      values (?, ?, ?, ?, ?)`, [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.birthday
    ]);
  }

  update(user) {
    return this.database.query(
      `update ${this.table} SET 
      firstName = ?, 
      lastName = ?, 
      email = ?, 
      password = ?, 
      birthday = ? 
      where id = ?`,
      [user.firstName, user.lastName, user.email, user.password, user.birthday, user.id]
    );
  }
}

module.exports = UserManager;

module.exports = UserManager;
