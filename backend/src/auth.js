const argon2 = require("argon2");

const hashPassword = async (password) => {
    try {
        const hashPassword = await argon2.hash(password);
        return hashPassword;
    } catch (err) {
        console.error("Error hashing password");
    }
};

module.exports = hashPassword