import { Router } from 'express';
import container from '../../container.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

const userLoginController = container.resolve('userLoginController');
const userRegisterController = container.resolve('userRegisterController');
const userProfileController = container.resolve('userProfileController');
const userRefreshController = container.resolve('userRefreshController');

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
router.post(
    '/refresh',
    authMiddleware,
    userRefreshController.execute.bind(userRefreshController)
);

export const userRoutes = router;
