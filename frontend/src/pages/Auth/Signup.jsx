// @ts-ignore

import React from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../redux/dispatch/useAuth";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

const signupFormSchema = z.object({
  username: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(2).max(50),
  confirmPassword: z.string().min(2).max(50),
});

const SignupForm = () => {
  const nav = useNavigate();

  const { auth, signup } = useAuth();

  const signupForm = useForm({
    resolver: zodResolver(signupFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values) {
    if (values.password !== values.confirmPassword) {
      return signupForm.setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      const isSuccessed = signup(
        values.username,
        values.email,
        values.password,
      );
      if (isSuccessed) {
        nav("/");
      }
    }
  }

  React.useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <div className="flex h-screen min-h-screen w-full flex-col items-center justify-center">
      <h2 className="mb-20 text-center text-5xl font-bold text-gray-800">
        Nobstash
      </h2>

      <Form {...signupForm}>
        <form
          onSubmit={signupForm.handleSubmit(onSubmit)}
          className="container w-full max-w-sm space-y-4"
        >
          <div className="mb-10">
            <h4 className="text-center text-xl font-bold">Create an account</h4>
            <p className="cursor-pointer text-center text-sm text-gray-600">
              Enter your email to sign up for this platform.
            </p>
          </div>

          <FormField
            control={signupForm.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={signupForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="password" {...field} type="password" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={signupForm.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="confirm password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Sign Up with Email
          </Button>
        </form>{" "}
      </Form>

      <p className="mt-5 cursor-pointer text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Button
          variant="link"
          className="px-0 font-semibold underline"
          onClick={() => nav("/login")}
        >
          Login
        </Button>{" "}
        here
      </p>

      <p className="mt-5 text-center text-xs text-gray-500">
        By clicking continue, you agree to our{" "}
        <Button variant="link" className="p-0 text-xs">
          {" "}
          Terms of Service
        </Button>{" "}
        and{" "}
        <Button variant="link" className="p-0 text-xs">
          Privacy Policy
        </Button>
      </p>
    </div>
  );
};

export default SignupForm;
