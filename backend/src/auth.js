const argon2 = require("argon2");

const verifyPasswordHash = async (hashedPassword, password) => {
  try {
    const isMatch = await argon2.verify(hashedPassword, password);
    return isMatch;
  } catch (err) {
    console.error("Error verifying password:", err);
    throw err;
  }
};

const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (err) {
    console.error("Error hashing password");
    throw err;
  }
};

module.exports = {
  hashPassword,
  verifyPasswordHash,
};
