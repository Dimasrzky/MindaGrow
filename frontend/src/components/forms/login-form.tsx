"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Icons } from "@/components/ui/icons";
import { useAuth } from "@/components/common/auth-provider";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const LoginForm = () => {
  const { login } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    try {
      const success = await login(data.email, data.password);

      if (success) {
        toast({
          title: "Login successful",
          description: "Welcome back to MindaGrow!",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Login failed",
          description: "Please check your credentials and try again.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description: "Please try again later",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to sign in to your account
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="name@example.com"
                    {...field}
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="w-full" type="submit" disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </form>
      </Form>

      <div className="flex items-center justify-between">
        <Link
          href="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
        <Link
          href="/register"
          className="text-sm text-primary hover:underline"
        >
          Don't have an account? Sign up
        </Link>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-col space-y-2">
        <Button variant="outline" type="button" disabled={isLoading}>
          <Icons.gitHub className="mr-2 h-4 w-4" />
          GitHub
        </Button>
        <Button variant="outline" type="button" disabled={isLoading}>
          <svg
            className="mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 0c-6.626 0-12 5.372-12 12 0 5.088 3.292 9.416 7.861 10.957 0.575 0.107 0.786-0.25 0.786-0.553 0-0.273-0.010-0.994-0.015-1.952-3.198 0.694-3.874-1.543-3.874-1.543-0.523-1.329-1.276-1.682-1.276-1.682-1.043-0.713 0.079-0.699 0.079-0.699 1.153 0.081 1.760 1.183 1.760 1.183 1.026 1.757 2.691 1.250 3.346 0.955 0.104-0.742 0.400-1.249 0.728-1.537-2.553-0.291-5.235-1.276-5.235-5.676 0-1.254 0.447-2.277 1.181-3.081-0.124-0.292-0.514-1.460 0.112-3.043 0 0 0.966-0.309 3.160 1.177 0.916-0.256 1.899-0.383 2.875-0.388 0.976 0.005 1.959 0.132 2.877 0.388 2.191-1.486 3.155-1.177 3.155-1.177 0.627 1.583 0.236 2.751 0.116 3.043 0.736 0.804 1.180 1.827 1.180 3.081 0 4.412-2.686 5.382-5.246 5.665 0.411 0.354 0.779 1.055 0.779 2.126 0 1.536-0.014 2.776-0.014 3.151 0 0.307 0.206 0.663 0.792 0.550 4.566-1.526 7.855-5.851 7.855-10.938 0-6.628-5.373-12-12-12z"
              fill="currentColor"
            />
          </svg>
          Google
        </Button>
      </div>
    </div>
  );
};