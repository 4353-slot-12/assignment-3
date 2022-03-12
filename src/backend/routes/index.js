import { Router } from 'express';
import UserService from '../services/user.js';
import passport from 'passport';
import { isAuth } from '../middleware/index.js'
import SampleService from '../services/sample.js';
import ProfileService from '../services/profile_hand.js';
import {profiles} from '../services/profile_hand.js';

const router = Router();

const wordyRegex = /^\w+$/i;

router.get('/auth', (req, res) => {
    return res.status(200).send({ authenticated: req.isAuthenticated() })
})

router.post('/login', (req, res, next) => {
    if (req.isAuthenticated())
        return res.redirect('/quote');
    const authenticateUser = passport.authenticate('local', {
        successReturnToOrRedirect: '/quote',
        failureRedirect: '/login'
    });
    authenticateUser(req, res, () => res.redirect('/login'));
})

export function logoutController(req, res) {
    req.logout();
    res.redirect('/');
}

router.get('/logout', isAuth, logoutController);

// Register new user endpoint
router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    if (!wordyRegex.test(username) || !wordyRegex.test(password) || password != confirmPassword) 
        return res.redirect('/register');

    if (UserService.findByUsername(username) == undefined) 
        UserService.insertUser(username, password);

    const authenticateUser = passport.authenticate('local');
    authenticateUser(req, res, () => res.redirect('/proto-profile'));
})


// Create profile endpoint
router.post('/profile', isAuth, (req, res) => {
    console.log("POST AAAAAAAAAAAAAAAAA")
    const profile = {
        userId: req.user.id,
        ...req.body,
    };

    const invalidField = ProfileService.validateProfile(profile);
    if (invalidField) 
        return res.status(428).send({ message: `Invalid ${invalidField} field.`})

    ProfileService.addProfile(profile);
    return res.redirect('/quote');
});


// Edit profile endpoint
router.put('/profile', isAuth, (req, res) => {
    console.log("put hehe")
    const profile = {
        userId: req.user.id,
        ...req.body,
    }

    const invalidField = ProfileService.validateProfile(profile);
    if (invalidField) 
        return res.status(428).send({ message: `Invalid ${invalidField} field.`});
    
    console.log(profiles);
    ProfileService.updateProfile(profile);
    console.log(profiles);

    return res.redirect('/quote');
})

// Get profile endpoint
router.get('/profile', isAuth, (req, res) => {
    console.log(req.user.id)
    const profile = ProfileService.findByUserId(req.user.id);
    if (profile === undefined)
        return res.status(404).redirect('/proto-profile');
    return res.status(302).send({data: profile});
});

router.post('/sample', SampleService.echoMessage)

export default router;