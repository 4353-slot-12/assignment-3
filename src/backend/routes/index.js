import { Router } from 'express';
import SampleService from '../services/sample';

const router = Router();

router.post('/account', (req, res) => {
    res.status(201).redirect('/proto-profile');
});

router.post('/profile', (req, res) => {
    res.status(201).redirect('/quote');
})

router.get('/logout', (req, res) => {
    res.status(201).redirect('/login');
})

// route for demonstrating unit tests.
router.get('/sample', SampleService.getSample)

export default router;