const AbstractManager = require("./AbstractManager");

class taskManager extends AbstractManager {
  constructor() {
    super({ table: "task" });
  }

  insert(task) {
    return this.database.query(`insert into ${this.table} 
        (title, description, status, deadline, id_user)  
        values (?, ?, ?, ?, ?)`, [
      task.title,
      task.description,
      task.status,
      task.deadline,
      task.id_user,
    ]);
  }

  update(task) {
    return this.database.query(
      `update ${this.table} set 
      title = ? 
      description = ? 
      status = ? 
      deadline = ? 
      where id = ?`,
      [ task.title, task.description, task.status, task.deadline, user.id]
    );
  }
}

module.exports = taskManager;