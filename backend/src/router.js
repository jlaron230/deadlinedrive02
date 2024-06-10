const express = require("express");

const router = express.Router();

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

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

module.exports = router;
