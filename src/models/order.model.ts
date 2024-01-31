import mongoose, { PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface OrderModelInterface extends mongoose.Model<{}> {}

const orderSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      ref: 'Product',
    },
    customer: {
      type: String,
      ref: 'Customer',
    },
  },
  { timestamps: true }
);

orderSchema.plugin(paginate);

export const OrderModel = mongoose.model<
  {},
  PaginateModel<OrderModelInterface>
>('Order', orderSchema);
