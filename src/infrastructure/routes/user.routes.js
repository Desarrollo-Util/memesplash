import { Router } from 'express';
import container from '../../container.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

const userLoginController = container.resolve('userLoginController');
const userRegisterController = container.resolve('userRegisterController');
const userProfileController = container.resolve('userProfileController');

router.post('/login', userLoginController.execute.bind(userLoginController));
router.post(
    '/register',
    userRegisterController.execute.bind(userRegisterController)
);
router.get(
    '/profile',
    authMiddleware,
    userProfileController.execute.bind(userProfileController)
);

export const userRoutes = router;
