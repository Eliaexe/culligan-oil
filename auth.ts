import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import User from '@/models/User.model';
import { authConfig } from '@/auth.config';
import dbConnect from "./lib/db";

// Configurazione di NextAuth con i provider di autenticazione
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut
} = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password", placeholder: "Password" }
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        // Verifica che i campi email e password siano forniti
        if (!email || !password) {
          throw new Error('Email and password are required');
        }

        try {
          // Connessione al database
          await dbConnect();
          const user = await User.findOne({ email: email });

          if (!user) {
            throw new Error('User not found');
          }

          // Confronto della password hashata
          console.log(password, user.password)
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            throw new Error('Invalid password');
          }

          // Restituisce l'utente se l'autenticazione ha successo
          return user;
        } catch (err) {
          console.error("Error during authentication: ", err);
          throw new Error('Authentication failed');
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    jwt: true
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin', // Puoi definire la tua pagina di login personalizzata
    error: '/auth/error' // Pagina di errore
  },
  secret: process.env.NEXTAUTH_SECRET
});

// Estendi il tipo per la sessione e l'utente
declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      role: string;
    }
  }

  interface User {
    role: string;
  }
}
