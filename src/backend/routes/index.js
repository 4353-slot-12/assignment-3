import { Router } from 'express';
import UserService from '../services/user.js';
import passport from 'passport';

const router = Router();

router.post('/account', (req, res) => {
    res.status(308).redirect('/proto-profile');
});

router.post('/profile', (req, res) => {
    res.status(308).redirect('/quote');
})


const wordyRegex = /^\w+$/i;

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/quote',
    failureRedirect: '/login',
    failureMessage: true
}));

router.post('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (!wordyRegex.test(username) || !wordyRegex.test(password)) {
        res.status(428).send({ message: 'Bad username or password.'});
        return;
    }
    if (UserService.findByUsername(username) != undefined) {
        res.status(401).send({ message: 'User already exists' })
        return;
    }
    UserService.insertUser(username, password);
    res.status(201).send({ redirect: '/proto-profile' });
})


export default router;