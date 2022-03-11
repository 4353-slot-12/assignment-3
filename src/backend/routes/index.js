import { Router } from 'express';
import UserService from '../services/user.js';
import passport from 'passport';
import { isAuth } from '../middleware/index.js'
import SampleService from '../services/sample.js';
import ProfileService from '../services/profile_hand.js';

const router = Router();

const wordyRegex = /^\w+$/i;

router.post('/account', (req, res) => {
    res.status(308).redirect('/proto-profile');
});

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

    ProfileService.insertProfile(profile);
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

    const profileId = ProfileService.removeProfile(req.user.id);
    ProfileService.insertProfile(profile, profileId);
    return res.redirect('/quote');
})

router.get('/profile', isAuth, (req, res) => {
    const profile = ProfileService.findByUserId(req.user.id);
    if (profile === undefined)
        return res.redirect('/proto-profile');
    return res.status(200).send({ data: profile });
});

// router.get('/profile/:id', (req, res) => {
//     let profileId = parseInt(req.params.id);
//     console.log(profileId);
//     let prof = profile_service.getProfile(id);
//     if(prof === undefined){
//         res.status(404).send(null);
//     }else{
//         res.status(200).send(JSON.stringify(prof));
//     }
// })

// router.post('/profile/:id', (req, res) => {
//     let profile = JSON.parse(req.body.profile);
//     let id = parseInt(req.params.id.slice(1))
//     profile_service.updateProfile(id, profile);
//     res.status(202);
//     res.send();
// })

// router.put('/profile', (req, res) => {
//     profile_service.addProfile(JSON.parse(req.body.profile))
//     res.status(201);
//     res.send();
// })

router.post('/sample', SampleService.echoMessage)

export default router;