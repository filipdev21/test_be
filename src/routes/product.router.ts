import { Router } from 'express';
import { get } from '../controllers/product.controller';
import { authenticate } from '../middlewares/verifyToken';

const publisherRouter = Router();

publisherRouter.get('/', authenticate, get);

export default publisherRouter;
