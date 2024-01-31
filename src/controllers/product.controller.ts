import { Request, Response, NextFunction } from 'express';
import { ProductModel } from '../models';

export async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await ProductModel.find();

    res.json({
      data,
    });
  } catch (err) {
    next(err);
  }
}
