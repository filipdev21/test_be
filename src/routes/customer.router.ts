import { Router } from 'express';
import { login, verify, order, get } from '../controllers/customer.controller';
import { authenticate } from '../middlewares/verifyToken';

const customerRouter = Router();

customerRouter.get('/verify', authenticate, verify);
customerRouter.post('/login', login);
customerRouter.post('/order', authenticate, order);
customerRouter.get('/order', authenticate, get);

export default customerRouter;
