import mongoose, { PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

interface IProduct {
  name: string;
}

interface ProductDoc extends mongoose.Document {
  name: string;
}

interface ProductModelInterface extends mongoose.Model<IProduct> {}

const productSchema = new mongoose.Schema(
  {
    name: String,
  },
  { timestamps: true }
);

productSchema.plugin(paginate);

export const ProductModel = mongoose.model<
  ProductDoc,
  PaginateModel<ProductModelInterface>
>('Product', productSchema);
