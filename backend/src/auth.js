const argon2 = require("argon2"); // Import the argon2 library for password hashing
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library for token generation and verification

// Middleware function to hash the user's password before storing it
const hashPassword = async (req, res, next) => {
  argon2.hash(req.body.password) // Hash the password from the request body
    .then((hashedPassword) => {
      console.log("asmaa plus forte que vous"); // Log a message indicating successful hashing
      req.body.password = hashedPassword; // Replace the plaintext password with the hashed password
      next(); // Call the next middleware function
    })
    .catch((err) => {
      console.error(err); // Log any errors that occur during hashing
      res.sendStatus(500); // Send a 500 Internal Server Error status if hashing fails
    });
};

// Function to verify the user's password during login
const verifyPassword = (req, res) => {
  console.log("testr2:", req.user.password, req.body.password); // Log the hashed and plaintext passwords for debugging

  argon2.verify(req.user.password, req.body.password) // Verify the hashed password against the plaintext password
    .then((isVerified) => {
      if (isVerified) {
        console.log("acceptée"); // Log a message indicating successful verification

        const payload = { sub: req.user.id }; // Create a JWT payload with the user's ID

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "99h", // Set the token to expire in 99 hours
        });

        delete req.user.hashedPassword; // Remove the hashed password from the user object for security
        res.send({ user: req.user, token: token }); // Send the user object and JWT token as the response
      } else {
        res.sendStatus(401); // Send a 401 Unauthorized status if password verification fails
      }
    })
    .catch((err) => {
      console.error(err); // Log any errors that occur during verification
      res.sendStatus(500); // Send a 500 Internal Server Error status if verification fails
    });
};

// Middleware function to verify the JWT token for protected routes
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization"); // Get the Authorization header from the request

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing"); // Throw an error if the header is missing
    }

    const [type, token] = authorizationHeader.split(" "); // Split the header into type and token

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type"); // Throw an error if the header type is not 'Bearer'
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET); // Verify the token and store the payload in the request object

    next(); // Call the next middleware function
  } catch (err) {
    console.error(err); // Log any errors that occur during verification
    res.sendStatus(401); // Send a 401 Unauthorized status if token verification fails
  }
};

// Export the functions for use in other parts of the application
module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken
};