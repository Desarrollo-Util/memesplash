import { Router } from 'express';
import {
    userLoginController,
    userRegisterController,
} from '../controllers/user.controllers.js';

const router = Router();

router.post('/login', userLoginController);
router.post('/register', userRegisterController);

export const userRoutes = router;
