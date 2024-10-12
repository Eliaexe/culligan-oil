import { NextResponse, NextRequest } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { getToken } from "next-auth/jwt";
import { JWT } from "next-auth/jwt"; // Importa il tipo JWT se necessario
import { PUBLIC_ROUTES, LOGIN, ROOT, PROTECTED_SUB_ROUTES } from "./lib/routes";

const { auth } = NextAuth(authConfig);

interface Session {
  user: {
    name: string;
    email: string;
    role: string;
  };
  expires: string | undefined;
}

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const token: JWT | null = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });
  
  const session: Session | null = token ? {
    user: {
      name: token.name as string,
      email: token.email as string,
      role: token.role as string,
    },
    expires: token.exp ? new Date(token.exp * 1000).toISOString() : undefined,
  } : null;

  const isAuthenticated: boolean = !!session?.user;

  const isPublicRoute: boolean = (
    (PUBLIC_ROUTES.some((route: string) => nextUrl.pathname.startsWith(route)) || nextUrl.pathname === ROOT) 
    && !PROTECTED_SUB_ROUTES.some(route => nextUrl.pathname.includes(route))
  );

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
