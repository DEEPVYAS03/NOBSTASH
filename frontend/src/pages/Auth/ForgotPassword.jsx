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

const forgotPasswordFormSchema = z.object({
  email: z.string().email(),
});

const Login = () => {
  const nav = useNavigate();

  const { auth, forgotPassword } = useAuth();

  const forgotPasswordForm = useForm({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values) {
    if (await forgotPassword(values.email)) {
      nav("/reset-password?email=" + values.email);
    }
  }

  return (
    <div className="flex h-screen min-h-screen w-full flex-col items-center justify-center">
      <h2 className="mb-20 text-center text-5xl font-bold text-gray-800">
        Nobstash
      </h2>

      <Form {...forgotPasswordForm}>
        <form
          onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}
          className="container w-full max-w-sm space-y-4"
        >
          <div className="mb-10">
            <h4 className="text-center text-xl font-bold">Forgot Password</h4>
          </div>

          <FormField
            control={forgotPasswordForm.control}
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

          <Button type="submit" className="w-full">
            Send Mail
            {/* {OTP} */}
          </Button>
        </form>{" "}
      </Form>

      <p className="mt-5 cursor-pointer text-center text-sm text-gray-600">
        Not have an account?{" "}
        <Button
          variant="link"
          className="px-0 font-semibold underline"
          onClick={() => nav("/signup")}
        >
          Signup
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

export default Login;
