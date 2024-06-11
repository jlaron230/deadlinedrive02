const AbstractManager = require("./AbstractManager");

class DeadlineManager extends AbstractManager {
  constructor() {
    super({ table: "deadline" });
  }

  // Function to insert a new deadline into the database
  insert(deadline) {
    return this.database.query(`INSERT INTO ${this.table} 
      (description, title, debut, end, statut, id_user) 
      VALUES (?, ?, ?, ?, ?)`, [
        deadline.description,
        deadline.title,
        deadline.debut,
        deadline.end,
        deadline.statut,
        deadline.id_user
    ]);
  }
  
  // Function to update an existing deadline in the database
  update(deadline) {
    return this.database.query(
      `UPDATE ${this.table} SET 
        description = ?, 
        title = ?, 
        debut = ?, 
        end = ?, 
        statut = ?, 
        id_user = ? 
      WHERE id = ?`,
      [
        deadline.description, 
        deadline.title, 
        deadline.debut, 
        deadline.end, 
        deadline.statut, 
        deadline.id_user, 
        deadline.id
      ]
    );
  }
}

module.exports = DeadlineManager;
