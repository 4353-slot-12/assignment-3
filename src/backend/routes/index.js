import { Router } from 'express';
import UserService from '../services/user.js';
import passport from 'passport';
import { isAuth } from '../middleware/index.js'
import SampleService from '../services/sample.js';
import ProfileService from '../services/profile_hand.js';

const router = Router();

const wordyRegex = /^\w+$/i;

router.get('/logout', (req, res) => {
    res.status(201).redirect('/login');
})

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/quote',
    failureRedirect: '/login',
    failureMessage: true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Register new user endpoint
router.post('/register', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    if (!wordyRegex.test(username) || !wordyRegex.test(password) || password != confirmPassword) 
        return res.status(428).send({ message: 'Bad username or password.'});

    if (UserService.findByUsername(username) != undefined) 
        return res.status(401).send({ message: 'User already exists' })

    UserService.insertUser(username, password);
    const authenticateUser = passport.authenticate('local');
    authenticateUser(req, res, () => res.redirect('/proto-profile'));
})


// Create profile endpoint
router.post('/profile', isAuth, (req, res) => {
    const profile = {
        id: req.user.id,
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
    const profile = {
        userId: req.user.id,
        ...req.body,
    }

    const invalidField = ProfileService.validateProfile(profile);
    if (invalidField) 
        return res.status(428).send({ message: `Invalid ${invalidField} field.`})

    ProfileService.removeProfile(req.user.id);
    ProfileService.addProfile(profile);

    return res.redirect('/quote');
})

<<<<<<< Updated upstream
// Get profile endpoint
=======

>>>>>>> Stashed changes
router.get('/profile', isAuth, (req, res) => {
    // console.log(req.user);
    // console.log(req)
    const profile = ProfileService.findByUserId(req.user.id);
    console.log(profile)
    if (profile === undefined)
        return res.status(404).redirect('/proto-profile');
    return res.status(302).send({data: profile});
});

router.post('/sample', SampleService.echoMessage)

export default router;