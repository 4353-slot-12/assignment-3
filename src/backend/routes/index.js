import { Router } from 'express';
import { isAuth } from '../middleware/index.js'
import SampleService from '../services/sample.js';
import { 
    loginController, 
    logoutController, 
    createProfileController, 
    editProfileController, 
    getProfileController, 
    registerController, 
    authController,
    createQuoteController,
    getHistoryController,
} from '../controllers/index.js';

const router = Router();

router.get('/auth', authController)
router.post('/login', loginController);
router.post('/register', registerController);
router.post('/sample', SampleService.echoMessage)


router.get('/logout', isAuth, logoutController);
router.post('/profile', isAuth, createProfileController);
router.put('/profile', isAuth, editProfileController)
router.get('/profile', isAuth, getProfileController);
router.post('/quote', isAuth, createQuoteController);
router.get('/quote', isAuth, getHistoryController);

export default router;