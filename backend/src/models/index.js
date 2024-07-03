require("dotenv").config(); // Load environment variables from a .env file

const mysql = require("mysql2/promise"); // Import the mysql2 library with promise support

// Destructure environment variables for database connection
const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

// Create a connection pool to the database
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});

// Try to get a connection to the database
pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// Declare and fill models: this is where you register your own managers
const models = {};

// Import and set up the ItemManager
const ItemManager = require("./ItemManager");
models.item = new ItemManager();
models.item.setDatabase(pool);

// Import and set up the UserManager
const UserManager = require("./UserManager");
models.user = new UserManager();
models.user.setDatabase(pool);

// Import and set up the CategoryManager
const CategoryManager = require("./CategoryManager");
models.category = new CategoryManager();
models.category.setDatabase(pool);

// Import and set up the QuoteManager
const QuoteManager = require("./QuoteManager");
models.quote = new QuoteManager();
models.quote.setDatabase(pool);

// Import and set up the DeadlineManager
const DeadlineManager = require("./DeadlineManager");
models.deadline = new DeadlineManager();
models.deadline.setDatabase(pool);

// Import and set up the Quote_CategoryManager
const Quote_CategoryManager = require("./Quote_CategoryManager");
models.quote_category = new Quote_CategoryManager();
models.quote_category.setDatabase(pool);

// Import and set up the TaskManager

const TaskManager = require("./TaskManager");
models.task = new TaskManager();
models.task.setDatabase(pool);

// Import and set up the UserVoteManager
const UserVoteManager = require("./UserVoteManager");
models.user_votes = new UserVoteManager();
models.user_votes.setDatabase(pool);

// Use a proxy to personalize error messages when asking for a non-existing model
const CommentManager = require("./CommentManager");
models.comment = new CommentManager();
models.comment.setDatabase(pool);

// bonus: use a proxy to personalize error message,
// when asking for a non existing model

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop]; // Return the model if it exists
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    ); // Throw a custom error message if the model is not defined
  },
};

module.exports = new Proxy(models, handler); // Export the models object wrapped in a proxy
