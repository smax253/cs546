const bcrypt = require('bcrypt');
const users = require('../data/users');

const login = async (username, password) => {
    const targetUser = users.find((user) => user.username === username);
    if (!targetUser) return null;
    return bcrypt.compare(password, targetUser.hashedPassword)
        ? targetUser
        : null;
};

module.exports = login;
