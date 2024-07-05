const AbstractManager = require('./AbstractManager');

// NotificationManager class extends the generic AbstractManager to manage notification-related data
class NotificationManager extends AbstractManager {
    constructor() {
        super({ table: "notification" }); // Initializes the base class with the table name 'notification'
    }

    // Create a new notification in the database with user ID, quote ID, and the current date
    create(userId, quoteId) {
        const dateSent = new Date().toISOString().slice(0, 10); // Get the current date in YYYY-MM-DD format
        return this.database.query(
            `INSERT INTO notification (user_id, quote_id, date_sent, is_read) VALUES (?, ?, ?, FALSE)`,
            [userId, quoteId, dateSent]  // Parameters for SQL query to insert the new notification
        );
    }

    // Mark a notification as read by setting its 'is_read' field to TRUE
    markAsRead(notificationId) {
        return this.database.query(
            `UPDATE notification SET is_read = TRUE WHERE id = ?`,
            [notificationId]  // Notification ID to update
        );
    }

    // Retrieve all notifications for a specific user, ordered by the date they were sent
    findByUserId(userId) {
        return this.database.query(
            `SELECT * FROM notification WHERE user_id = ? ORDER BY date_sent DESC`,
            [userId]  // User ID to find notifications for
        );
    }
}

module.exports = NotificationManager;  // Export the NotificationManager class for use elsewhere in the application
