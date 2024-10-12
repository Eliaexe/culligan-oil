'use client';
import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { BiLogoGoogle } from "react-icons/bi";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { register } from "@/app/actions/register"; // Assicurati che questo funzioni con la tua API.

type ImageProps = {
    url?: string;
    src: string;
    alt?: string;
};

type ButtonProps = {
    title: string;
    variant?: 'default' | 'secondary' | 'outline' | 'ghost';
    size?: 'default' | 'sm' | 'lg';
};

export type Props = {
    logo: ImageProps;
    loginText: string;
    loginLink: {
        text: string;
        url: string;
    };
    title: string;
    description: string;
    signUpButton: ButtonProps;
    signUpWithGoogleButton: ButtonProps & {
        iconLeft?: React.ReactNode;
    };
    footerText: string;
};

const formSchema = z.object({
    name: z.string().min(2, { message: "Le nom doit avoir au moins 2 caractères" }),
    surname: z.string().min(2, { message: "Le prénom doit avoir au moins 2 caractères" }),
    email: z.string().email({ message: "Adresse email invalide" }),
    password: z.string().min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" }),
    confirmPassword: z.string().min(6, { message: "Le mot de passe doit comporter au moins 6 caractères" }),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
});

export const Signup1 = (props: Props) => {
    const {
        logo,
        loginText,
        loginLink,
        title,
        description,
        signUpButton,
        signUpWithGoogleButton,
        footerText,
    } = props;

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            surname: "",
            email: "",
            password: "",
            confirmPassword: ""
        },
        mode: "onChange",
    });

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await register(values);
            toast.success(`${values.name} ${values.surname} enregistré !`);
        } catch (err) {
            toast.error(err.message);
            console.error(err.message);
        }
    };

    const { isSubmitting, isValid } = form.formState;

    // Colors based on your existing theme
    const textColor = '#FDDD57'; // Primary text color (golden)
    const bgColor = '#0B0B0B'; // Background color
    const inputBgColor = '#0B0B0B'; // Input background color (dark)
    const inputBorderColor = '#4C6D1C'; // Input border color (green)

    return (
        <motion.div
            className="container max-w-sm mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <h1 className="mb-5 text-xl font-bold md:text-4xl lg:text-5xl" style={{ color: textColor }}>
                {title}
            </h1>
            <p className="mb-6 text-md" style={{ color: textColor }}>
                {description}
            </p>

            <form className="grid grid-cols-1 gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
                {['name', 'surname', 'email', 'password', 'confirmPassword'].map((fieldName) => (
                    <div key={fieldName} className="grid w-full items-center">
                        <Label htmlFor={fieldName} className="mb-2" style={{ color: textColor }}>
                            {fieldName === 'name' ? 'Nom' : 
                            fieldName === 'surname' ? 'Prénom' : 
                            fieldName === 'email' ? 'Email' : 
                            fieldName === 'password' ? 'Mot de passe' : 
                            'Confirmer le mot de passe'}*
                        </Label>
                        <Input
                            type={fieldName.includes('password') ? 'password' : 'text'}
                            id={fieldName}
                            {...form.register(fieldName as 'name' | 'surname' | 'email' | 'password' | 'confirmPassword')}
                            style={{
                                backgroundColor: inputBgColor,
                                color: textColor,
                                border: `1px solid ${inputBorderColor}`,
                            }}
                        />
                        <p className="text-red-500 text-xs">{form.formState.errors[fieldName]?.message}</p>
                    </div>
                ))}

                <div className="grid gap-4">
                    <Button
                        variant={signUpButton.variant}
                        size={signUpButton.size}
                        type="submit"
                        disabled={!isValid || isSubmitting}
                        style={{
                            color: textColor,
                            border: `2px solid ${textColor}`,
                            backgroundColor: 'transparent',
                        }}
                    >
                        {isSubmitting ? 'En cours...' : signUpButton.title}
                    </Button>
                    <Button
                        variant={signUpWithGoogleButton.variant}
                        size={signUpWithGoogleButton.size}
                        className="flex items-center gap-x-3"
                        style={{
                            color: textColor,
                            border: `2px solid ${textColor}`,
                            backgroundColor: 'transparent',
                        }}
                    >
                        {signUpWithGoogleButton.iconLeft}
                        {signUpWithGoogleButton.title}
                    </Button>
                </div>
            </form>

            <p className="text-sm mt-4" style={{ color: textColor }}>
                {loginText}{" "}
                <a href={loginLink.url} className="underline">
                    {loginLink.text}
                </a>
            </p>

            <footer className="mt-4">
                <p className="text-xs" style={{ color: textColor }}>
                    {footerText}
                </p>
            </footer>
        </motion.div>
    );
};

// Default values
export const Signup1Defaults: Props = {
    logo: {
        url: "/",
        src: "https://d22po4pjz3o32e.cloudfront.net/logo-image.svg", // Default logo URL
        alt: "Logo Cullinan Oil",
    },
    loginText: "Vous avez déjà un compte?",
    loginLink: {
        text: "Se connecter",
        url: "/acceder",
    },
    title: "Inscription",
    description: "Rejoignez Cullinan Oil pour accéder à des fonctionnalités exclusives.",
    signUpButton: {
        title: "S'inscrire",
        variant: "default",
    },
    signUpWithGoogleButton: {
        variant: "secondary",
        title: "S'inscrire avec Google",
        iconLeft: <BiLogoGoogle className="w-5 h-5" />,
    },
    footerText: "© 2024 Cullinan Oil",
};
