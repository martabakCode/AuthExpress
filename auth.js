const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const saltRounds = 10;
const secretKey = crypto.randomBytes(32).toString('hex');

const generateToken = (user) => {
    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });
    return token;
};

const hashPassword = async (password) => {
    return bcrypt.hash(password, saltRounds);
};

const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = {
    generateToken,
    hashPassword,
    comparePassword,
    secretKey, // Export the secretKey for use in other files
};
