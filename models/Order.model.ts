import mongoose, { Document, Schema } from 'mongoose';

interface OrderProduct {
    productId: string;
    quantity: number;
    price: number;
}

export interface OrderDocument extends Document {
    user: string;
    products: OrderProduct[];
    totalAmount: number;
    paymentStatus: string;
    paymentMethod: string;
    paymentIntentId?: string;
    shippingAddress: string;
    createdAt: Date;
    updatedAt: Date;
}

const OrderSchema = new Schema<OrderDocument>(
    {
        user: { type: String, required: true },
        products: [
            {
                productId: { type: String, required: true },
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
            },
        ],
        totalAmount: { type: Number, required: true },
        paymentStatus: { type: String, required: true },
        paymentMethod: { type: String, required: true },
        paymentIntentId: { type: String },
        shippingAddress: { type: String, required: true },
    },
    { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model<OrderDocument>('Order', OrderSchema);

export default Order;
