const express = require("express"); // Import the Express framework

const router = express.Router(); // Create an instance of Express router

const {
    verifyPassword,
  } = require("./auth");

// Import user controller functions
const userControllers = require("./controllers/userControllers");

// Define routes for user operations
router.get("/users", userControllers.browse); // Route to browse all users
router.get("/users/:id", userControllers.read); // Route to read a specific user by ID
router.put("/users/:id", userControllers.edit); // Route to edit a user by ID
router.post("/users", userControllers.add); // Route to add a new user
router.delete("/users/:id", userControllers.destroy); // Route to delete a user by ID

// Similar setup for categories, quotes, tasks, deadlines, and quote categories
const categoryControllers = require("./controllers/categoryControllers");
router.get("/categories", categoryControllers.browse);
router.get("/categories/:id", categoryControllers.read);
router.put("/categories/:id", categoryControllers.edit);
router.post("/categories", categoryControllers.add);
router.delete("/categories/:id", categoryControllers.destroy);

const quoteControllers = require("./controllers/quoteControllers");
router.get("/quotes", quoteControllers.browse);
router.get("/quotes/:id", quoteControllers.read);
router.put("/quotes/:id", quoteControllers.edit);
router.post("/quotes", quoteControllers.add);
router.delete("/quotes/:id", quoteControllers.destroy);

const taskControllers = require("./controllers/taskControllers");
router.get("/tasks", taskControllers.browse);
router.get("/tasks/:id", taskControllers.read);
router.put("/tasks/:id", taskControllers.edit);
router.post("/tasks", taskControllers.add);
router.delete("/tasks/:id", taskControllers.destroy);

const deadlineControllers = require("./controllers/deadlineControllers");
router.get("/deadline", deadlineControllers.browse);
router.get("/deadline/:id", deadlineControllers.read);
router.put("/deadline/:id", deadlineControllers.edit);
router.post("/deadline", deadlineControllers.add);
router.delete("/deadline/:id", deadlineControllers.destroy);

const quote_categoryControllers = require("./controllers/quote_categoryControllers");
router.get("/quote_category", quote_categoryControllers.browse);
router.get("/quote_category/:id", quote_categoryControllers.read);
router.put("/quote_category/:id", quote_categoryControllers.edit);
router.post("/quote_category", quote_categoryControllers.add);
router.delete("/quote_category/:id", quote_categoryControllers.destroy);

const commentControllers = require("./controllers/commentControllers");

router.get("/comments", commentControllers.browse);
router.get("/comment/:id", commentControllers.read);
router.put("/comment/:id", commentControllers.edit);
router.post("/comment", commentControllers.add);
router.delete("/comment/:id", commentControllers.destroy);

// LOGIN


router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

router.post(
  "/users/login",
  userControllers.getUserByEmailWithPasswordAndPassToNext,
  userControllers.generateToken
);

module.exports = router;


module.exports = router;
