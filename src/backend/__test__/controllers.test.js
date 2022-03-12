import { beforeEach, expect, test, describe } from "@jest/globals";
import ProfileService, { profiles } from "../services/profile.js";

import { 
    loginController, 
    logoutController, 
    createProfileController, 
    editProfileController, 
    getProfileController, 
    registerController, 
    authController
} from '../controllers/index.js';


const fakeUser = {
    user: {
        id: 'abc123',
        hash: 'bcd234',
        salt: 'cde345',
        username: 'bob'
    },
    body: {
        name: 'bob sagat',
        address1: '123 apple st',
        address2: 'po box 1234',
        city: 'hobokin',
        state: 'NJ',
        zip: '12345'
    },
}

let req = {
    url: null,
    auth: true,
    logoutCalled: false,
    isAuthenticated() { return this.auth; },
    logout() { this.logoutCalled = true },
    ...fakeUser,
}

const res = {
    redirectUrl: null,
    statusCode: null,
    sent: null,
    redirect(url) { this.redirectUrl = url; this.statusCode = 304; },
    status(code) { this.statusCode = code; return this; },
    send(data) { this.sent = data; }
}



let nextCalled = false;

function next() { nextCalled = true; }

describe('controllers', () => {
    beforeEach(() => {
        profiles.length = 0;
        req.body.name = 'bob sagat';
        req.auth = true;
        req.url = null;
        req.logoutCalled = false;


        res.redirectUrl = null;
        res.statusCode = null;
        res.sent = null;

        nextCalled = false;
    });

    test('logout', () => {
        const req = {
            logoutCalled: false,
            logout() { this.logoutCalled = true },
        }
        const res = {
            redirectUrl: null,
            redirect(url) { this.redirectUrl = url },
        };
        logoutController(req, res);
        expect(req.logoutCalled).toBe(true);
        expect(res.redirectUrl).toBe('/');
    });

    test('login auth', () => {
        loginController(req, res);
        expect(res.redirectUrl).toBe('/quote');
        expect(res.statusCode).toBe(304);
    })

    test('create profile', () => {
        createProfileController(req, res);
        expect(res.statusCode).toBe(304);
        expect(res.redirectUrl).toBe('/quote');
    });

    test('create invalid profile', () => {
        req.body.name = 'b@b 5@6@t';
        createProfileController(req, res);
        expect(res.statusCode).toBe(428);
        expect(res.sent).toEqual({ message: "Invalid name field."});
        expect(res.redirectUrl).toBeNull();
    });

    test('edit profile', () => {
        const data = { ...req.body, userId: req.user.id };
        ProfileService.addProfile(data);

        editProfileController(req, res);
        expect(res.statusCode).toBe(304);
        expect(res.redirectUrl).toBe('/quote');
    });

    test('edit invalid profile', () => {
        const data = { ...req.body, userId: req.user.id };
        ProfileService.addProfile(data);

        req.body.name = 'b@b 5@6@t';
        editProfileController(req, res);
        expect(res.statusCode).toBe(428);
        expect(res.sent).toEqual({ message: "Invalid name field."});
        expect(res.redirectUrl).toBeNull();
    });

    test('get profile', () => {
        const data = { ...req.body, userId: req.user.id };
        ProfileService.addProfile(data);
        getProfileController(req, res);
        expect(res.statusCode).toBe(200);
        expect(res.sent).toEqual({ data })
    });

    test('get profile no exist', () => {
        getProfileController(req, res);
        expect(res.statusCode).toBe(304);
        expect(res.redirectUrl).toBe("/proto-profile");
        expect(res.sent).toBeNull();
    });
});