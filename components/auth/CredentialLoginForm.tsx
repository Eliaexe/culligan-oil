// CredentialLoginForm.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { doCredentialLogin, LoginResponse } from "@/app/actions/index"; // Assicurati che il percorso sia corretto
import { toast } from "sonner";
import { motion } from "framer-motion";

// Schema di validazione per il modulo
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export default function CredentialLoginForm() {
  const router = useRouter();
  const [error, setError] = useState('');
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange"
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setError('');
    try {
      const formData = new FormData();
      formData.append('email', values.email);
      formData.append('password', values.password);
      const response: LoginResponse = await doCredentialLogin(formData);
      
      if (response?.error) {
        setError(response.error);
        toast.error(response.error);
      } else {
        toast.success("Login successful!");
        router.push('/'); // Reindirizza alla home page
      }
    } catch (err) {
      console.error(err);
      const errorMessage = 'An unexpected error occurred. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  // Colori basati sul tuo tema esistente
  const textColor = '#FDDD57'; // Colore del testo principale (oro)
  const inputBgColor = '#0B0B0B'; // Colore di sfondo input (scuro)
  const inputBorderColor = '#4C6D1C'; // Colore del bordo input (verde)

  return (
    <motion.div
      className="container max-w-sm mx-auto text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: textColor }}>Email</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="email" 
                    style={{
                      backgroundColor: inputBgColor,
                      color: textColor,
                      border: `1px solid ${inputBorderColor}`,
                    }} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel style={{ color: textColor }}>Password</FormLabel>
                <FormControl>
                  <Input 
                    {...field} 
                    type="password" 
                    style={{
                      backgroundColor: inputBgColor,
                      color: textColor,
                      border: `1px solid ${inputBorderColor}`,
                    }} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}
          <Button 
            type="submit" 
            className="w-full" 
            style={{
              color: textColor,
              border: `2px solid ${textColor}`,
              backgroundColor: 'transparent',
            }}
          >
            Login
          </Button>
        </form>
      </Form>
    </motion.div>
  );
}
