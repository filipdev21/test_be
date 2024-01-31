import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomerModel, ICustomer, OrderModel } from '../models';
import { handleError } from '../errors/handleError';
require('dotenv').config();

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await OrderModel.find({});

    res.json({
      data: orders,
    });
  } catch (err) {
    next(err);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email } = req.body;

    const isExist = await CustomerModel.exists({ email });

    if (!isExist) {
      return handleError(res, 404, 'User does not exist!');
    }

    const user: ICustomer | null = await CustomerModel.findOne({ email });

    const token = jwt.sign(
      {
        id: user?._id,
        email: user?.email,
        exp: Math.floor(Date.now() / 1000) + 5 * 60 * 60 * 60,
      },
      process.env.JWT_SECRET ?? '12345'
    );

    res.json({
      data: {
        user,
        token,
      },
    });
  } catch (err) {
    next(err);
  }
}

export async function verify(req: any, res: Response, next: NextFunction) {
  try {
    res.json({
      data: req.user,
    });
  } catch (err) {
    next(err);
  }
}

export async function order(req: Request, res: Response, next: NextFunction) {
  try {
    const { productId, customerId } = req.body;

    const alreadyExist = await OrderModel.exists({
      product: productId,
      customer: customerId,
    });

    if (alreadyExist) {
      return handleError(res, 400, 'Product is already ordered!');
    }

    const data = new OrderModel({
      product: productId,
      customer: customerId,
    });

    await data.save();

    res.json({
      data: 'success',
    });
  } catch (err) {
    next(err);
  }
}
