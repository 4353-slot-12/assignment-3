import { Router } from 'express';
import passport from 'passport';
import crypto from 'crypto';
import LocalStrategy from 'passport-local';
import UserService from '../services/user.js';

const router = Router();

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
    // Validate username & password here.
    if (UserService.findUser(username) != undefined) {
        res.status(401).send({ message: 'User already exists.' })
        return;
    }
    UserService.insertUser(username, password);
    res.status(201).redirect('/proto-profile')
})


export default router;