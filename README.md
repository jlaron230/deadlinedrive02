# Setup & Use
## Project Initialization
Clone the repository and navigate into it:

Copier le code
```bash
git clone <repository_url>
cd <repository_name>
```
Install dependencies using npm:

Copier le code
```bash
npm install
Backend Server Setup:
```

The backend is hosted on port 5000, and the frontend on port 5173.
Configure the backend .env file with your database credentials for AlwaysData.
plaintext
Copier le code

# backend/.env

```bash DB_HOST=<database_host>
DB_USER=<database_username>
DB_PASSWORD=<database_password>
DB_NAME=<database_name>
PORT=5000
```
Available Commands
migrate: Run database migration scripts.

Copier le code
```bash
npm run migrate
dev: Start both frontend and backend servers concurrently.
```

Copier le code
```bash
npm run dev
```
dev-front: Start only the React frontend server.

Copier le code
```bash
npm run dev-front
```
dev-back: Start only the Express backend server.

Copier le code
```bash
npm run dev-back
```
# Backend Details
## Database: 
Uses AlwaysData for database hosting.

## Middleware: 
Includes authentication middleware using Argon2 for password hashing.

## Controllers: Handles application logic and interacts with models.

## Models: 
Defines database schemas and interacts with the database.
Frontend Details

## Framework: 
Built with React for the frontend user interface.

## Tooling: 
Uses Vite for fast development and building.

## Concurrently: 
Manages multiple commands in a single CLI window.

## Nodemon: 
Monitors file changes and restarts the server automatically.
Features Overview

## Deadlines Management: 
Users can create and track deadlines using a calendar interface.

## Favorite Quotes: 
Users can search and add quotes to their favorites list or create new ones.

## User Account Management: 
Includes user profile editing, password changes, and account deletion.

## Notifications: 
Users can receive periodic notifications about quotes.
Contact Admins: Via a Formik-based contact form for user inquiries.

## Legal Information:
Access to privacy policy and terms of use.
Tools Used

## React: 
Frontend framework for building user interfaces.

## Express: Backend framework for handling API requests and business logic.

## Argon2: 
Used for secure password hashing.

## AlwaysData: Hosting service for database management.

## Vite: Fast build tool for React applications.

## Nodemon: Automatically restarts the server on file changes, enhancing development workflow.

This manual now includes details about the backend setup, server configurations, middleware usage, and additional information about controllers and models related to the database. Adjust the content further based on specific functionalities and configurations unique to your project.

# Additional Details
## Backend Structure

## Authentication: 
Middleware using Argon2 for secure password hashing and authentication handling.

## Controllers: 
Responsible for handling application logic and interacting with models.

## Models: 
Defines schemas and interacts with the database using ORM (Object-Relational Mapping).

# Frontend Features

## User Interface: 
Built with React for a responsive and interactive user experience.

## State Management: 
Utilizes React hooks and context API for state management.
Component Library: Tailwind CSS for styling components and UI elements.

# Project Architecture

## Client-Server Interaction: 
Communicates via RESTful APIs between frontend and backend.

## Database Management: 
Utilizes MySQL database hosted on AlwaysData, configured in the backend .env file.

# Deployment

Local Development: Use npm run dev to run both frontend and backend servers concurrently for local development.

## Production Deployment: 
Deploy frontend and backend separately, ensuring backend is configured with correct environment variables for database connectivity.

## Folder Structure

## plaintext
Copier le code

```bash
project-root/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── auth/
│   ├── .env
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── vite.config.js
│   └── ...
├── .gitignore
├── README.md
└── package.json
```

Technologies Used

## React: 
Frontend framework for building single-page applications.

## Express: 
Backend framework for handling API requests and business logic.

## MySQL: 
Database management system for storing application data.

## Argon2: 
Secure password hashing algorithm for user authentication.

## Vite: 
Fast build tool that provides a modern development experience for frontend development.

## Tailwind CSS: 
Utility-first CSS framework for styling components.
Support and Contact

For any issues or questions related to the application, please contact us at support@example.com or visit our support page for more information.