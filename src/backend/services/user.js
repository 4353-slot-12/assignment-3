import crypto from 'crypto';

export const users = [];

export default class UserService {
    static generateHash(password, salt) {
        return crypto.pbkdf2Sync(password, salt, 10000, 32, 'sha256').toString('hex');
    }

    static generateSalt() {
        return crypto.randomBytes(16).toString('hex');
    }

    static generateUserId() {
        return crypto.randomBytes(12).toString('hex');
    }

    static findByUsername(username) {
        return users.find(user => user.username === username);
    }

    static findById(id) {
        return users.find(user => user.id === id);
    }

    static insertUser(username, password) {
        const salt = UserService.generateSalt();
        const newUser = {
            id: UserService.generateUserId(),
            username: username,
            password: UserService.generateHash(password, salt),
            salt: salt,
        };
        users.push(newUser);
        console.log(`-- NEW USER -- \n${JSON.stringify(newUser, null, 4)}`);
        console.log(`-- USERS -- \n${JSON.stringify(users, null, 4)}`);
    }

    static verifyPassword(user, password) {
        const givenHash = UserService.generateHash(password, user.salt);
        if (givenHash === user.hash) {
            console.log(`User ${user.username} gave the correct password.`);
            return true;
        }
        return false;
    }
}