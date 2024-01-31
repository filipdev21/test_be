// @ts-ignore
import data from './data.json';
import { CustomerModel, ProductModel } from '../models';
import '../config/mongoose';

const { products, customers } = data;

(async () => {
  await CustomerModel.deleteMany({});
  await ProductModel.deleteMany({});

  for (const customer of customers) {
    const newCustomer = await new CustomerModel({
      name: customer.name,
      email: customer.email,
    });
    await newCustomer.save();
  }

  for (const product of products) {
    const newProduct = await new ProductModel({
      name: product.name,
    });
    await newProduct.save();
  }

  console.log('Seeding initial database is finished successfully');
})();
