const AbstractManager = require("./AbstractManager");

class QuoteManager extends AbstractManager {
    constructor() {
        super({ table: "quote" });
    }

    insert(quote) {
        return this.database.query(`insert into ${this.table} (author, type, text, vote,) values (?, ?, ?, ?, ?)`, [
            quote.id,
            quote.author,
            quote.type,
            quote.text,
            quote.vote
        ]);
    }

    update(quote) {
        return this.database.query(
            `update ${this.table} set title = ?, author = ?, type = ?, text = ?, vote = ? where id = ?`, 
            [
                quote.id,
                quote.author,
                quote.type,
                quote.text,
                quote.vote,
            ]
        );
    }

    delete(id) {
        return this.database.query(
            `delete from ${this.table} where id = ?`, 
            [id]
        );
    }
}


module.exports = QuoteManager;