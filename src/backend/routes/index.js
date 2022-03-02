import { Router } from 'express';

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

export default router;