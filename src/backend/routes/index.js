import { Router } from 'express';
import SampleService from '../services/sample.js';
import ProfileService from '../services/profile_hand.js';

const router = Router();
let profile_service = new ProfileService();

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

// route for demonstrating unit tests.
router.post('/sample', SampleService.echoMessage)

export default router;