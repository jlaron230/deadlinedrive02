const AbstractManager = require("./AbstractManager");

class UserVoteManager extends AbstractManager {
    constructor() {
        super({ table: "user_votes" });
    }

    getVoteByUserAndQuote(userId, quoteId) {
        return this.database.query(
            `SELECT * FROM ${this.table} WHERE user_id = ? AND quote_id = ?`,
            [userId, quoteId]
        );
    }

    insertVote(userId, quoteId, vote) {
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, quote_id, vote) VALUES (?, ?, ?)`,
            [userId, quoteId, vote]
        );
    }

    updateVote(userId, quoteId, vote) {
        return this.database.query(
            `UPDATE ${this.table} SET vote = ? WHERE user_id = ? AND quote_id = ?`,
            [vote, userId, quoteId]
        );
    }

}

module.exports = UserVoteManager;
