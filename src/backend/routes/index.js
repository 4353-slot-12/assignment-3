import { Router } from 'express';
import SampleService from '../services/sample.js';
import ProfileService from '../services/profile_hand.js';
import QuoteHistoryService from '../services/quote_history.js'; 
import { Quote } from '../services/quote_history.js';

const router = Router();
let profile_service = new ProfileService();
let quote_service = new QuoteHistoryService();

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

router.get('/quote/:id', (req, res) => {
    let id = parseInt(req.params.id.slice(1))
    let prof = quote_service.getQuote(id);
    if(prof === undefined){
        res.status(404).send(null);
    }else{
        res.status(200).send(JSON.stringify(prof));
    }
})

router.post('/quote', (req, res) => {
    const gallonsRequested = req.body.gallonsRequested;
    const deliveryDate = new Date(req.body.deliveryDate);
    const tmpQuote = new Quote(1, gallonsRequested, "Apples Street", deliveryDate)

    const todayDate = new Date();
    if (gallonsRequested < 1 || deliveryDate < todayDate.toISOString()) {
        res.status(428).send();
    } else {
        quote_service.addQuote(tmpQuote)
        res.status(201).send();
    }
    // console.log(deliveryDate.toISOString());
    // res.status(200).send();
})

// route for demonstrating unit tests.
router.post('/sample', SampleService.echoMessage)

export default router;