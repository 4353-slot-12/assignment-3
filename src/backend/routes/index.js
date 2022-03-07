import { Router } from 'express';
import SampleService from '../services/sample.js';

const router = Router();

router.post('/account', (req, res) => {
    res.status(308).redirect('/proto-profile');
});

router.post('/profile', (req, res) => {
    res.status(308).redirect('/quote');
})

router.get('/logout', (req, res) => {
    res.status(308).redirect('/login');
})

// route for demonstrating unit tests.
router.post('/sample', SampleService.echoMessage)

export default router;