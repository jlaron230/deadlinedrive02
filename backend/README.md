# MVC Express Backend

This repository contains a simple Express MVC framework designed to facilitate rapid development of web applications. Follow the steps below to set up and run the server.

## Setup

**Clone the Repository**
   ```bash
   git clone <repository-url>
Install Dependencies
   ```
```bash
npm install
```

Environment Setup
**Create a .env file based on the .env.sample provided. Fill in your database parameters:**

```bash
DB_HOST=your_db_host
DB_PORT=your_db_port
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
```

Database Setup

**Adapt the database.sql script to include your own tables. You can import this script into your SQL server manually or run a migration script:**

   ```bash
npm run migrate
Start the Server
```
**Run the server in development mode:**

```bash
npm run dev
```

Access the Application
**Open your browser and go to http://localhost:5000 to start using the application.**

# API Endpoints

Below are the available API endpoints grouped by functionality. Ensure you have set up your .env and database configurations properly to use these endpoints.

# User Management

* List Users
* GET /users
* Get User
* GET /users/:id
* Create User
* POST /users
* Middleware: hashPassword
* Update User
* PUT /users/:id
* Middleware: verifyToken, verifyId
* Delete User
* DELETE /users/:id
* User Login
* POST /users/login
* Validations: Checks for email and name formats.

# Quotes Management

* List Quotes
* GET /quotes
* Get Quote
* GET /quotes/:id
* Create Quote
* POST /quotes
* Update Quote
* PUT /quotes/:id
* Delete Quote
* DELETE /quotes/:id

# Categories Management

* List Categories
* GET /categories
* Get Category
* GET /categories/:id
* Create Category
* POST /categories
* Update Category
* PUT /categories/:id
* Delete Category
* DELETE /categories/:id

# List Tasks

* GET /tasks
* Get Task
* GET /tasks/:id
* Create Task
* POST /tasks
* Update Task
* PUT /tasks/:id
* Delete Task
* DELETE /tasks/:id

# List Deadlines

* GET /deadlines
* Get Deadline
* GET /deadlines/:id
* Create Deadline
* POST /deadlines
* Update Deadline
* PUT /deadlines/:id
* Delete Deadline
* DELETE /deadlines/:id

## Additional Features

* Manage Favorites
* Add, view, and delete favorite quotes.
* User Votes
* Users can upvote or downvote quotes.
* Notifications
* Manage user notifications.
* Development Notes

## Windows Users: Set Git to handle line endings correctly for your platform:

```bash
git config --global core.autocrlf true
For more detailed API documentation, including request and response formats, refer to the inline comments in the router.js and controller files. Ensure your database and .env settings are configured correctly to avoid connection issues.
```

This documentation is organized and provides an overview of the setup process, as well as detailed descriptions of the API endpoints. You can adapt the details as necessary to match your specific configurations and setup.

## Controllers
* userManager : Handles user-related operations.
* quoteManager: Handles quote-related operations.
* commentManager: Handles comment-related operations.
* categoryManager: Handles category-related operations.
* deadlineManager: Handles deadline-related operations.
* quote_categoryManager: Handles operations related to the   association 
* between quotes and categories.
* taskManager: Handles task-related operations.

## Middleware
auth: Middleware for authentication and authorization using JSON Web Tokens (JWT).

---
This Markdown version uses the bash code block syntax to format commands and route examples appropriately. You can use it directly in your README.md documentation.

