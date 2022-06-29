import { Router } from 'express';
import container from '../../container.js';

const router = Router();

const userLoginController = container.resolve('userLoginController');
const userRegisterController = container.resolve('userRegisterController');

router.post('/login', userLoginController.execute.bind(userLoginController));
router.post(
    '/register',
    userRegisterController.execute.bind(userRegisterController)
);

export const userRoutes = router;
