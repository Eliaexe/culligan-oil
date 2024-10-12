"use server"

import bcrypt from 'bcryptjs';
import User from "@/models/User.model";

interface FormData {
  name: string;
  surname: string;
  email: string;
  password: string;
}

export async function register(formData: FormData): Promise<void> {

    try {
        const { name, surname, email, password } = formData;

        if (!email) throw new Error('Please provide an email');

        const foundUser = await User.findOne({ email: email }).lean();

        if (!foundUser) {
            // Cripta la password
            const hashedPassword = await bcrypt.hash(password, 10);

            const userPayload = {
                name: name,
                surname: surname,
                email: email,
                password: hashedPassword // Usa la password criptata
            };

            await User.create(userPayload);
        } else {
            throw new Error(`${email} already exists`);
        }

    } catch (err: any) {
        throw new Error(err.message);
    }
}
