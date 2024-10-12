import mongoose, { Document } from 'mongoose';

// Define the ProductDocument interface
export interface ProductDocument extends Document {
  name: string;
  description: string;
  price: number;
  image: string;
}

// Define the product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
});

// Check for an existing model and use it, or create a new model if it doesn't exist
const Product = mongoose.models?.Product || mongoose.model<ProductDocument>('Product', productSchema);

export default Product;
