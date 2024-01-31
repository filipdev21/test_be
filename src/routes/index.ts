import { Router } from 'express';
import customerRouter from './customer.router';
import productRouter from './product.router';

const RootRouter = Router();

RootRouter.use('/customer', customerRouter);
RootRouter.use('/product', productRouter);

export default RootRouter;
