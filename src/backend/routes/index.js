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
    let prof = profile_service.getProfile(req.params.id);
    if(prof === null){
        res.status(404).send(null);
    }else{
        res.status(200).send(prof);
    }
})

router.post('/profile/:id', (req, res) => {
    let profile = req.body.object;
    profile_service.update(req.params.id, profile);
    res.status(200);
    res.send();
})

router.put('/profile', (req, res) => {
    profile_service.addProfile(req.body.object)
    res.status(200);
    res.send();
})

// route for demonstrating unit tests.
router.post('/sample', SampleService.echoMessage)

export default router;