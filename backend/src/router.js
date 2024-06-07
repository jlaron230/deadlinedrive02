const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.browse);
router.get("/users/:id", userControllers.read);
router.put("/users/:id", userControllers.edit);
router.post("/users", userControllers.add);
router.delete("/users/:id", userControllers.destroy);

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
