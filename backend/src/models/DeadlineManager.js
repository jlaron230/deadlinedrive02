const AbstractManager = require("./AbstractManager");

class DeadlineManager extends AbstractManager {
  constructor() {
    super({ table: "deadline" });
  }

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
  

  update(deadline) {
    return this.database.query(
        `UPDATE ${this.table} SET 
        description = ?, 
        title = ?, 
        debut = ?, 
        end = ?, 
        statut = ? 
        id_user = ? 
        WHERE id = ?`,
        [deadline.description, deadline.title, deadline.debut, deadline.end, deadline.statut, deadline.id_user]
      );
    }
  }

module.exports = DeadlineManager;