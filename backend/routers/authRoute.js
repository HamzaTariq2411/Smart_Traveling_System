import express from 'express';
import signupController from '../controllers/authControllers/signup-Controller.js';
import loginController from '../controllers/authControllers/login-Controller.js';
import userController from '../controllers/authControllers/user-Controller.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadimage.js';
import updateUserController from '../controllers/authControllers/updateUser-Controller.js';
import verifyPasswordController from '../controllers/authControllers/verifyPasswordController.js';

const router = express.Router();

router.route('/signup').post(upload.single("image"), signupController);
router.route('/login').post(loginController);
router.route('/user').get(authMiddleware, userController);
router.route('/updateUser').put(authMiddleware, upload.single("image"), updateUserController);
router.route('/verifyPassword').post(authMiddleware, verifyPasswordController);

export default router;
