import UserService from '../services/user.js';

test('salt generates correctly', () => {
    const salt = UserService.generateSalt();
    expect(salt).toMatch(/^[0-9a-f]{32}$/);
});

test('user id generates correctly', () => {
    const salt = UserService.generateUserId();
    expect(salt).toMatch(/^[0-9a-f]{24}$/);
});

test('password hash generates correctly', () => {
    const salt = UserService.generateSalt();
    const password = 'keyboardCat';
    const hash = UserService.generateHash(password, salt);
    expect(hash).toMatch(/^[0-9a-f]{64}$/);
});


describe('verify password tests', () => {
    test('success', () => {
        const salt = UserService.generateSalt();
        const user = {
            id: UserService.generateUserId(),
            username: 'bob',
            hash: UserService.generateHash('keyboardCat', salt),
            salt: salt
        }

        const result = UserService.verifyPassword(user, 'keyboardCat');
        expect(result).toBe(true);
    })

    test('failure', () => {
        const salt = UserService.generateSalt();
        const user = {
            id: UserService.generateUserId(),
            username: 'bob',
            hash: UserService.generateHash('keyboardCat', salt),
            salt: salt
        }

        const result = UserService.verifyPassword(user, 'keyboardDog');
        expect(result).toBe(false);
    })
});