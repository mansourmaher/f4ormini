"use client";
import { type Metadata } from "next";
import Link from "next/link";

import { LoginSchema } from "@/app/schemas";
import { login } from "@/actions/auth/login";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "./_compoenets/Form-error";
import { FormSucces } from "./_compoenets/Form-succes";
import { SlimLayout } from "@/app/_landing_component/slim-layout";
import { Button } from "@/components/ui/button";

export default function Login() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [succes, setSucces] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",

      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    console.log(values);
    setError("");
    setSucces("");
    startTransition(() => {
      login(values).then((result) => {
        setError(result?.error);

        setSucces(result?.success);

        localStorage.setItem("email", values.email);
      });
    });
  };
  return (
    <SlimLayout>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Sign in to your account
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Don’t have an account?{" "}
        <Link
          href="/register"
          className="font-medium text-orange-600 hover:underline"
        >
          Sign up
        </Link>{" "}
        for a free trial.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid grid-cols-1 gap-y-8"
          aria-disabled={isPending}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    required
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    required
                    type="password"
                    placeholder="Password"
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSucces message={succes} />
          <div>
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isPending}
              variant="ghost"
              onClick={() => form.handleSubmit(onSubmit)}
            >
              <span>
                Sign in <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
          </div>
        </form>
      </Form>
    </SlimLayout>
  );
}
