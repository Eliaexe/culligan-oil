'use server'

import dbConnect from '@/lib/db';
import User from '@/models/User.model';
import bcrypt from 'bcryptjs';

export async function createUser(userData: {
    name: string;
    surname: string;
    email: string;
    password: string;
}) {
    await dbConnect();

    const { name, surname, email, password } = userData;

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name: name.toLowerCase(),
            surname: surname.toLowerCase(),
            email: email.toLowerCase(),
            password: hashedPassword
        });

        return { success: true, user: { id: newUser._id, name: newUser.name, email: newUser.email } };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: error instanceof Error ? error.message : 'An unexpected error occurred' };
    }
}
