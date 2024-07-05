# MVC Express

## Description
This repository is a simple Express MVC structure from scratch.

## Steps
1. Clone the repo from Github.
2. Run `npm install`.
3. Create `.env` from `.env.sample` file and add your DB parameters. Don't delete the `.sample` file, it must be kept.
   ```bash
   DB_HOST=your_db_host
   DB_PORT=your_db_port
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=your_db_name

4. Adapt database.sql with your own tables. Import the script into your SQL server manually or run migrate script (either using npm run migrate or yarn run migrate).

5. Start the server in dev mode with npm run dev or yarn run dev. This will run index.js using nodemon.

6. Go to localhost:5000 with your favorite browser.
From this starter kit, create your own web application.

# Windows Users
If you develop on Windows, you should edit your git configuration to change your end of line rules with this command :

```bash git config --global core.autocrlf true```

## Example
An example (a basic list of items) is provided (you can load the database.sql file in a test database). The accessible URLs are:

* Home page: GET `localhost:5000/`

* User browse: GET `localhost:5000/users`
 
* User read: GET `localhost:5000/users/:id`

* User edit: PUT `localhost:5000/users/:id`

* User add: POST `localhost:5000/users`
 
* User deletion: DELETE `localhost:5000/users/:id`
 
* Quote browse: GET `localhost:5000/quotes`

* Quote read: GET `localhost:5000/quotes/:id`

* Quote edit: PUT `localhost:5000/quotes/:id`

* Quote add: POST `localhost:5000/quotes`

* Quote deletion: DELETE `localhost:5000/quotes/:id`

* Comment browse: GET `localhost:5000/comments`

* Comment read: GET `localhost:5000/comments/:id`

* Comment edit: PUT `localhost:5000/comments/:id`

* Comment add: POST `localhost:5000/comments`

* Comment deletion: DELETE `localhost:5000/comments/:id`

* Category browse: GET `localhost:5000/categories`

* Category read: GET `localhost:5000/categories/:id`
 
* Category edit: PUT `localhost:5000/categories/:id`

* Category add: POST `localhost:5000/categories`

* Category deletion: DELETE `localhost:5000/categories/:id`

* Deadline browse: GET `localhost:5000/deadlines`

* Deadline read: GET `localhost:5000/deadlines/:id`

* Deadline edit: PUT `localhost:5000/deadlines/:id`

* Deadline add: POST `localhost:5000/deadlines`

* Deadline deletion: `DELETE localhost:5000/deadlines/:id`

* Quote-Category browse: GET `localhost:5000/quote_categories`

* Quote-Category read: GET `localhost:5000/quote_categories/:id`

* Quote-Category edit: PUT `localhost:5000/quote_categories/:id`

* Quote-Category add: POST `localhost:5000/quote_categories`

* Quote-Category deletion: DELETE `localhost:5000/* quote_categories/:id`

* Task browse: GET `localhost:5000/tasks`

* Task read: GET `localhost:5000/tasks/:id`

* Task edit: PUT `localhost:5000/tasks/:id`

* Task add: POST `localhost:5000/tasks`

* Task deletion: DELETE `localhost:5000/tasks/:id`

You can find all these routes declared in the file src/router.js. You can add your own new routes, controllers, and models.

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

Cette version Markdown utilise la syntaxe de bloc de code ```bash ``` pour formater les commandes et les exemples de routes de manière appropriée. Vous pouvez l'utiliser directement dans votre documentation README.md.

