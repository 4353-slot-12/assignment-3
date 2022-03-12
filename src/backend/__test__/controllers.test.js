import { beforeEach, expect, test, describe } from "@jest/globals";

const req = {
    url: null,
    auth: true,
    logoutCalled: false,
    isAuthenticated() { return this.auth; },
    logout() { this.logoutCalled = true },
}

const res = {
    redirectUrl: null,
    statusCode: null,
    redirect(url) { this.redirectUrl = url; },
    status(code) { this.statusCode = code; return this; }
}

let nextCalled = false;

function next() { nextCalled = true; }

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