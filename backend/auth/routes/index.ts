import * as express from 'express';
import { body } from 'express-validator'

const router = express.Router();

import { login, signup } from '../controllers/';


router.use(express.json());

router.post('/login',
    body('email').isEmail(),
    body('password').trim().isLength({ min: 8, max: 256 }),
    login)
router.post('/signup', signup);

export default router;