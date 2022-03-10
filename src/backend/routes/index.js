import { Router } from 'express';
import UserService from '../services/user.js';
import passport from 'passport';
import SampleService from '../services/sample.js';
import ProfileService from '../services/profile_hand.js';

const router = Router();
let profile_service = new ProfileService();

router.post('/account', (req, res) => {
    res.status(308).redirect('/proto-profile');
});

router.get('/logout', (req, res) => {
    res.status(201).redirect('/login');
})

// Profile related routs 
router.post('/profile', (req, res) => {
    res.status(308).redirect('/quote');
})


const wordyRegex = /^\w+$/i;

router.post('/login', passport.authenticate('local', {
    successReturnToOrRedirect: '/quote',
    failureRedirect: '/login',
    failureMessage: true
}));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// WORKS!
router.post('/register', (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    
    if (!wordyRegex.test(username) || !wordyRegex.test(password) || password != confirmPassword) {
        res.status(428).send({ message: 'Bad username or password.'});
        return;
    }
    if (UserService.findByUsername(username) != undefined) {
        res.status(401).send({ message: 'User already exists' })
        return;
    }
    UserService.insertUser(username, password);
    res.redirect('/proto-profile');
})

router.get('/profile/:id', (req, res) => {
    let id = parseInt(req.params.id.slice(1))
    let prof = profile_service.getProfile(id);
    if(prof === undefined){
        res.status(404).send(null);
    }else{
        res.status(200).send(JSON.stringify(prof));
    }
})

router.post('/profile/:id', (req, res) => {
    let profile = JSON.parse(req.body.profile);
    let id = parseInt(req.params.id.slice(1))
    profile_service.updateProfile(id, profile);
    res.status(202);
    res.send();
})

router.put('/profile', (req, res) => {
    profile_service.addProfile(JSON.parse(req.body.profile))
    res.status(201);
    res.send();
})

export default router;