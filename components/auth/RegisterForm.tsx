'use client'
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { toast } from "sonner"

import { register } from "@/app/actions/register"

import Link from 'next/link';

const formSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  surname: z.string().min(2, { message: "Surname must be at least 2 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export function RegisterCard() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      confirmPassword: ""
    },
    mode: "onChange"
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    try {
      await register(values)
      toast.success(`${values.name + ' ' + values.surname} registered!`)
    } catch (err) {
      toast.error(err.message)
      console.error(err.message)
    }
  }

  const { isSubmitting, isValid } = form.formState;

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>Create your account in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {['name', 'surname', 'email', 'password', 'confirmPassword'].map((fieldName) => (
              <FormField
                key={fieldName}
                control={form.control}
                name={fieldName as "name" | "surname" | "email" | "password" | "confirmPassword"}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}</FormLabel>
                    <FormControl>
                      <Input {...field} type={fieldName.includes('password') ? 'password' : 'text'} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button type="submit" className="w-full" disabled={!isValid || isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Register'}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-center">
         You already have an account?{" "}
          <Link href="/login" className="underline">
            Login
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export default RegisterCard;