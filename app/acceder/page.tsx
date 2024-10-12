'use client'
import React, { useState } from 'react';
import { Signup1, Signup1Defaults, Props as Signup1Props } from "@/components/Signup1";
import LoginPage from "@/components/Login"; // Assicurati che l'importazione sia corretta

export default function Acceder() {
    const [isLogin, setIsLogin] = useState(true); // Imposta il valore iniziale a true per mostrare prima il login

    const toggleLoginSignup = () => {
        setIsLogin(!isLogin);
    };

    const customProps: Partial<Signup1Props> = {
        logo: {
            url: "/",
            src: "/logo.png",
            alt: "Logo de l'Entreprise",
        },
        title: isLogin ? "Connexion" : "Inscrivez-vous",
        description: isLogin 
            ? "Veuillez vous connecter pour continuer." 
            : "Rejoignez-nous pour accéder à des fonctionnalités exclusives.",
        signUpButton: {
            title: "Inscrivez-vous",
            variant: "default",
        },
        footerText: "© 2024 Culligan Oil",
    };

    return (
        <>
            <section id="signup" className="px-[5%]">
                <div className="relative flex min-h-screen flex-col items-stretch justify-center overflow-auto py-24">
                    <div className="absolute top-0 left-0 right-0 flex h-16 items-center justify-between">
                        <a href={customProps.logo.url}>
                            <img
                                src={customProps.logo.src}
                                alt={customProps.logo.alt}
                                className="h-5 w-auto" // Ensure the logo resizes correctly
                            />
                        </a>
                        <div className="flex gap-x-1">
                            <p className="hidden md:block" style={{ color: '#FDDD57' }}>
                                {isLogin ? "Vous n'avez pas encore de compte ?" : "Vous avez déjà un compte ?"}
                            </p>
                            <button onClick={toggleLoginSignup} style={{ color: '#FDDD57', textDecoration: 'underline' }}>
                                {isLogin ? "Enregistrez-vous" : "Accédez"}
                            </button>
                        </div>
                    </div>

                    {isLogin ? (
                        <LoginPage />
                    ) : (
                        <Signup1
                            {...Signup1Defaults}
                            {...customProps}
                        />
                    )}
                </div>
            </section>
            <footer className="absolute bottom-0 left-0 right-0 flex h-16 items-center justify-center">
                <p className="text-sm" style={{ color: '#FDDD57' }}>{customProps.footerText}</p>
            </footer>
        </>
    );
}
