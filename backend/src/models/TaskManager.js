const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "task" }); // Call the constructor of the parent class AbstractManager and pass the table name "task"
  }

  // Method to validate the task object
  validateTask(task) {
    // Check if the task properties are of the correct types
    if (
      typeof task.title !== "string" || // Check if title is a string
      typeof task.description !== "string" || // Check if description is a string
      typeof task.status !== "string" || // Check if status is a string
      typeof task.deadline !== 'date' || // Check if deadline is a Date object
      typeof task.id_user !== "number" // Check if id_user is a number
    ) {
      return false; // If any validation fails, return false
    }
    return true; // Otherwise, return true
  }

  // Method to insert a new task into the database
  insert(task) {
    // Check if the task is valid
    if (!this.validateTask(task)) {
      throw new Error("Invalid data."); // If not, throw an error
    }

    // Destructure task object to get its properties
    const { title, description, status, deadline, id_user } = task;
    // Execute the SQL INSERT query
    return this.database.query(
      `INSERT INTO ${this.table} 
      (title, description, status, deadline, id_user)  
      VALUES (?, ?, ?, ?, ?)`,
      [title, description, status, deadline, id_user]
    );
  }

  // Method to update an existing task in the database
  update(task) {
    // Check if the task has an ID
    if (!task.id) {
      throw new Error("ID is required for update."); // If not, throw an error
    }

    // Check if the task is valid
    if (!this.validateTask(task)) {
      throw new Error("Invalid data."); // If not, throw an error
    }

    // Execute the SQL UPDATE query
    return this.database.query(
      `UPDATE ${this.table} SET 
      title = ?, 
      description = ?, 
      status = ?, 
      deadline = ? 
      WHERE id = ?`,
      [task.title, task.description, task.status, task.deadline, task.id]
    );
  }
}

module.exports = TaskManager; // Export the TaskManager class
