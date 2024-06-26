const argon2 = require("argon2"); // Import the argon2 library for password hashing
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library for token generation and verification
const models = require('./models'); // Assuming you have a models file to interact with your database

// Middleware function to hash the user's password before storing it
const hashPassword = async (req, res,next) => {
  try {
    const hashedPassword = await argon2.hash(req.body.password);
    req.body.password = hashedPassword;
  next();
} catch (err) {
    console.error('Error hashing password:', err);
    res.sendStatus(500);
  }
};

// Function to verify the user's password during login
const verifyPassword = async (req, res, next) => {
  try {
    console.log("Request body:", req.body);    
    console.log("Request user:", req.user);


    const isVerified = await argon2.verify(req.user.password, req.body.password);
    if (isVerified) {
      console.log("Password verification succeeded");

      const payload = { sub: req.user.id };
      console.log(payload);
      console.log(payload.sub);
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "99h" });
      
      delete req.user.password; // Ensure the password is not sent back to the client
      res.send({ user: req.user, token: token });
    } else {
      res.sendStatus(401);
    }
  next();
} catch (err) {
    console.error('Error verifying password:', err);
    res.sendStatus(500);
  }
};

// Middleware to verify the JWT token and attach user to the request
const verifyToken = async (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }
    
    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    };
  
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.payload = payload;
    console.log('Payload:', payload); // Debugging log to check the payload
    
    
    const user = await models.user.findById(payload.sub); // Use payload to get the user ID
    if (!user) {
      return res.status(404).send('User not found');
    }


    next(); // Call the next middleware function
  } catch (err) {
    console.error('Error verifying token:', err);
    res.sendStatus(401); // Send a 401 Unauthorized status if token verification fails
  }
};

// Function to verify if the authenticated user matches the requested user ID
const verifyId = (req, res, next) => {
  try {
    console.log(req.payload, "payload: ");
    console.log(req.params.id, "params");
    console.log("Request user:", req.user);
    if (req.payload && req.payload.sub === parseInt(req.params.id, 10)) {
     next()
    } else {
      res.sendStatus(403); // Forbidden
    }
    next()
  } catch (err) {
    console.error('Error verifying ID:', err);
    res.sendStatus(401);
  }
};



// Export the functions for use in other parts of the application
module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyId,
};