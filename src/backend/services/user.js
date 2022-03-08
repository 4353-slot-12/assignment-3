import crypto from 'crypto';

export const users = [];

export function generatePass(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
}

export function generateSalt() {
    return crypto.randomBytes(16).toString('hex');
}

export function generateUserId() {
    return crypto.randomBytes(12).toString('hex');
}

export function findUsername(username) {
    for (const user of users) {
        console.log(`user = ${user}`)
        if (user.username == username) {
            console.log('user found')
            return user;
        }
    }
}

export function insertUser(username, password) {
    const salt = generateSalt();
    const hash = generatePass(password, salt);
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

export function verifyPassword(username, givenPassword) {
    const user = findUsername(username);
    if (user === undefined) 
        return false;

    const givenHash = generatePass(givenPassword, user.salt);
    if (givenHash === user.hash) {
        console.log(`User ${username} gave the correct password.`);
        return true;
    }
    return false;
}

export default {
    users,
    generatePass,
    generateSalt,
    generateUserId,
    verifyPassword,
    findUsername,
    insertUser,
};