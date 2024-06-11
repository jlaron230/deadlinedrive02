const AbstractManager = require("./AbstractManager");

class TaskManager extends AbstractManager {
  constructor() {
    super({ table: "task" }); // Appel du constructeur de la classe parente AbstractManager en passant le nom de la table "task"
  }

  // Méthode pour valider l'objet task
  validateTask(task) {
    console.log('Validating task:', task);
    
    // Convert the deadline string to a Date object if it's a string
    if (typeof task.deadline === 'string') {
      task.deadline = new Date(task.deadline);
    }
    
    // Validate the task properties
    if (
      typeof task.title !== "string" || 
      typeof task.description !== 'string' || 
      typeof task.status !== "string" || 
      !(task.deadline instanceof Date) || isNaN(task.deadline.getTime()) || // Check if deadline is a valid Date object
      typeof task.id_user !== "number"
    ) {
      console.log('Validation failed:', {
        title: typeof task.title,
        description: typeof task.description,
        status: typeof task.status,
        deadline: task.deadline instanceof Date && !isNaN(task.deadline.getTime()),
        id_user: typeof task.id_user
      });
      return false;
    }
    return true;
  }
  

  // Méthode pour insérer une nouvelle tâche dans la base de données
  insert(task) {
    // Vérifier si la tâche est valide
    if (!this.validateTask(task)) {
      throw new Error("Invalid data."); // Si non, lever une erreur
    }

    // Déstructurer l'objet task pour obtenir ses propriétés
    const { title, description, status, deadline, id_user } = task;
    // Exécuter la requête SQL INSERT
    return this.database.query(
      `INSERT INTO ${this.table} 
      (title, description, status, deadline, id_user)  
      VALUES (?, ?, ?, ?, ?)`,
      [title, description, status, deadline, id_user]
    );
  }

  // Méthode pour mettre à jour une tâche existante dans la base de données
  update(task) {
    // Vérifier si la tâche a un ID
    if (!task.id) {
      throw new Error("ID is required for update."); // Si non, lever une erreur
    }

    // Vérifier si la tâche est valide
    if (!this.validateTask(task)) {
      throw new Error("Invalid data."); // Si non, lever une erreur
    }

    // Exécuter la requête SQL UPDATE
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

module.exports = TaskManager; // Exporter la classe TaskManager

