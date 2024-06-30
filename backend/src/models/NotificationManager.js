const AbstractManager = require('./AbstractManager');

class NotificationManager extends AbstractManager {
    constructor(database) {
        super({ table: "notification" });
        this.database = database;
    }

    create(userId, quoteId) {
        const dateSent = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
        return this.database.query(
            `INSERT INTO notification (user_id, quote_id, date_sent, is_read) VALUES (?, ?, ?, FALSE)`,
            [userId, quoteId, dateSent]
        );
    }

    markAsRead(notificationId) {
        return this.database.query(
            `UPDATE notification SET is_read = TRUE WHERE id = ?`,
            [notificationId]
        );
    }

    findByUserId(userId) {
        return this.database.query(
            `SELECT * FROM notification WHERE user_id = ? ORDER BY date_sent DESC`,
            [userId]
        );
    }
}

module.exports = NotificationManager;
