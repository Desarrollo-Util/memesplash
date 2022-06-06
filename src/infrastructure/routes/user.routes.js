import { Router } from 'express';
import { userRegisterController } from '../controllers/user.controllers.js';

const router = Router();

router.post('/register', userRegisterController);

export const userRoutes = router;
