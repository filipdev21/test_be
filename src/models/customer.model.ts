import mongoose, { PaginateModel } from 'mongoose';

export interface ICustomer {
  _id: string;
  name: string;
  email: string;
}

interface CustomerDoc extends mongoose.Document {
  name: string;
  email: string;
}

interface CustomerModelInterface extends mongoose.Model<ICustomer> {}

const customerSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const CustomerModel = mongoose.model<
  CustomerDoc,
  PaginateModel<CustomerModelInterface>
>('Customer', customerSchema);
