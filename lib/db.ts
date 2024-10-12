import mongoose, { ConnectOptions } from 'mongoose';
import bcryptjs from 'bcryptjs';
import Product, { ProductDocument } from '@/models/Product.model';
import Order, { OrderDocument } from '@/models/Order.model';
import User, { UserDocument } from '@/models/User.model';


const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

interface Cached {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    // Questo evita la duplicazione della dichiarazione globale di 'mongoose'
    var mongoose: Cached;
}

let cached: Cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const opts: ConnectOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    bufferCommands: false,
};

export default async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        return cached.conn;
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
            console.log('Db connected');
            return mongoose;
        }).catch(error => {
            cached.promise = null;
            throw error;
        });
    }

    try {
        cached.conn = await cached.promise;
    } catch (e) {
        cached.promise = null;
        throw e;
    }

    return cached.conn;
}

// Product Functions
export async function getProducts(): Promise<ProductDocument[]> {
    await dbConnect();   
    return Product.find({}).exec();
}

export async function getProductById(id: string): Promise<ProductDocument | null> {
    await dbConnect();
    return Product.findById(id).exec();
}

export async function createProduct(productData: ProductDocument): Promise<ProductDocument> {
    await dbConnect();
    return Product.create(productData);
}

export async function updateProduct(productData: ProductDocument): Promise<ProductDocument | null> {
    const { _id, ...updateData } = productData;
    await dbConnect();
    return Product.findByIdAndUpdate(_id, updateData, { new: true }).exec();
}

export async function deleteProduct(id: string): Promise<void> {
    await dbConnect();
    await Product.findByIdAndDelete(id).exec();
}


// Order Functions
export async function getOrders(): Promise<OrderDocument[]> {
    await dbConnect();
    return Order.find({}).exec();
}

export async function getOrderById(id: string): Promise<OrderDocument | null> {
    await dbConnect();
    return Order.findById(id).exec();
}

export async function createOrder(orderData: OrderDocument): Promise<OrderDocument> {
    await dbConnect();
    return Order.create(orderData);
}

export async function updateOrder(orderData: OrderDocument): Promise<OrderDocument | null> {
    const { _id, ...updateData } = orderData;
    await dbConnect();
    return Order.findByIdAndUpdate(_id, updateData, { new: true }).exec();
}

export async function deleteOrder(id: string): Promise<void> {
    await dbConnect();
    await Order.findByIdAndDelete(id).exec();
}

// User Functions
export async function getUsers(): Promise<UserDocument[]> {
    await dbConnect();
    return User.find({}).exec();
}

export async function getUserById(id: string): Promise<UserDocument | null> {
    await dbConnect();
    return User.findById(id).exec();
}

export async function getUserByEmailAndName(email: string, name: string): Promise<UserDocument | null> {
    await dbConnect();
    return User.findOne({ email, name }).exec();
  }

export async function createUser(userData: UserDocument): Promise<UserDocument> {
    await dbConnect();

    const { name, surname, email, password } = userData;

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = {
            name: name.toLowerCase(),
            surname: surname.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword
        };

        const createdUser = await User.create(newUser);
        return createdUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export async function updateUser(userData: UserDocument): Promise<UserDocument | null> {
    const { _id, ...updateData } = userData;
    await dbConnect();
    return User.findByIdAndUpdate(_id, updateData, { new: true }).exec();
}

export async function deleteUser(id: string): Promise<void> {
    await dbConnect();
    await User.findByIdAndDelete(id).exec();
}
