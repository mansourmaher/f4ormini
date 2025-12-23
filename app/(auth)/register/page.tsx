"use client";
import Link from "next/link";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterSchema } from "@/app/schemas";
import { register } from "@/actions/auth/register";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormSucces } from "../login/_compoenets/Form-succes";
import { SlimLayout } from "@/app/_landing_component/slim-layout";

export default function Register() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    console.log("Form submitted with values:", values);
    setError("");
    setSuccess("");
    startTransition(() => {
      register(values).then((result) => {
        setError(result?.error);
        setSuccess(result?.succes);
      });
    });
  };

  return (
    <SlimLayout>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Get started for free
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Already registered?{" "}
        <Link
          href="/login"
          className="font-medium text-orange-600 hover:underline"
        >
          Sign in
        </Link>{" "}
        to your account.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2"
        >
          <FormField
            control={form.control}
            name="firstname"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="first name">First name</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    name="first_name"
                    type="text"
                    autoComplete="given-name"
                    required
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.firstname?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="lastname">Last name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" required />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.lastname?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-full">
                <FormLabel htmlFor="email">Email address</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="col-span-full"
                    type="email"
                    required
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
              <FormItem className="col-span-full">
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="col-span-full"
                    type="password"
                    required
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <div className="col-span-full">
            <Button
              type="submit"
              className="w-full cursor-pointer"
              variant="ghost"
              disabled={isPending}
            >
              <span>
                Sign up <span aria-hidden="true">&rarr;</span>
              </span>
            </Button>
            <FormSucces message={success} />
          </div>
        </form>
      </Form>
    </SlimLayout>
  );
}
