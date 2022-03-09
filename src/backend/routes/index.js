import { Router } from 'express';
import SampleService from '../services/sample.js';
import ProfileService from '../services/profile_hand.js';

const router = Router();
let profiles = new ProfileService();

router.post('/account', (req, res) => {
    res.status(201).redirect('/proto-profile');
});

router.get('/logout', (req, res) => {
    res.status(201).redirect('/login');
})

// Profile related routs 
router.post('/profile', (req, res) => {
    res.status(201).redirect('/quote');
})

router.get('/profile/:id', (req, res) => {
    res.status(200);
    //res.send(profile_list.getProfile(req.params.id));
    res.send(null);
})

router.post('/profile/:id', (req, res) => {
    //profile = req.body.object;
    //profile.id = req.params.id;
    //profile.update(profile);
    res.status(200);
})

router.put('/profile', (req, res) => {
    //profile_list.addProfile(res.body.object)
    res.status(200);
    res.send();
})

// route for demonstrating unit tests.
router.post('/sample', SampleService.echoMessage)

export default router;