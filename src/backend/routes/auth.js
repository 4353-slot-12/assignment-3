import { Router } from 'express';
import passport from 'passport';
import crypto from 'crypto';
import LocalStrategy from 'passport-local';
import UserService from '../services/user.js';

const router = Router();

const validationRegex = /^\w+$/i;

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/quote',
    failureRedirect: '/login',
    failureMessage: true
}));

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/register', (req, res, next) => {
    const username = req.username;
    const password = req.password;
    if (!validationRegex.test(username) || !validationRegex.test(password)) {
        res.status(428).send({ message: 'Bad username or password.'});
        return;
    }
    if (UserService.findUser(username) != undefined) {
        res.status(401).send({ message: 'User already exists.' })
        return;
    }
    UserService.insertUser(username, password);
    res.status(201).redirect('/proto-profile')
})


export default router;