import crypto from 'crypto';

export const users = [];

export function generateHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
}

export function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

export function generateUserId() {
    return crypto.randomBytes(12).toString('hex');
}

export function findUsername(username) {
    return users.find(user => user.username === username);
}

export function findById(id) {
    return users.find(user => user.id === id);
}

export function insertUser(username, password) {
    const salt = generateSalt();
    const hash = generateHash(password, salt);
    const newUser = {
        id: generateUserId(),
        username: username,
        password: hash,
        salt: salt,
    };
    users.push(newUser);
    console.log(`New user created: ${JSON.stringify(newUser)}`);
    console.log(`Existing users: ${users}`);
}

export function verifyPassword(user, password) {
    const givenHash = generateHash(password, user.salt);
    if (givenHash === user.hash) {
        console.log(`User ${user.username} gave the correct password.`);
        return true;
    }
    return false;
}

export default {
    users,
    generateHash,
    generateSalt,
    generateUserId,
    verifyPassword,
    findUsername,
    insertUser,
};