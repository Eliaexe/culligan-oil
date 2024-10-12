import mongoose, { Document, Schema } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  surname: string;
  email: string;
  password: string;
  role: 'user' | 'admin';  
  createdAt: Date;
  updatedAt: Date;
  socialProviders?: {
    google?: {
      id: string;
      accessToken: string;
    },
    github?: {
      id: string;
      accessToken: string;
    };
    // altri provider possono essere aggiunti qui
  };
}

const UserSchema = new Schema<UserDocument>(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    role: {
      type: String,
      required: true,
      enum: ['user', 'admin'], 
      default: 'user'
    },
    socialProviders: {
      google: {
        id: String,
        accessToken: String,
      },
      github: {
        id: String,
        accessToken: String,
      },
      // altri provider possono essere aggiunti qui
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model<UserDocument>('User', UserSchema);

export default User;