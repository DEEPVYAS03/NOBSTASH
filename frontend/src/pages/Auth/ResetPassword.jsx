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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useLocation } from "react-router-dom";

const resetPasswordFormSchema = z.object({
  otp: z.string().min(6).max(6),
  newPassword: z.string().min(2).max(50),
  confirmNewPassword: z.string().min(2).max(50),
});

const ResetPassword = () => {
  const nav = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const { auth, resetPassword } = useAuth();

  const resetPasswordForm = useForm({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      otp: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  async function onSubmit(values) {
    if (values.newPassword !== values.confirmNewPassword) {
      return resetPasswordForm.setError("confirmNewPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
    } else {
      const email = queryParams.get("email");

      const isSuccess = await resetPassword(
        email,
        values.newPassword,
        values.otp,
      );
      if (isSuccess) {
        nav("/login");
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

      <Form {...resetPasswordForm}>
        <form
          onSubmit={resetPasswordForm.handleSubmit(onSubmit)}
          className="container w-full max-w-sm space-y-12"
        >
          <div className="mb-10">
            <h4 className="text-center text-xl font-bold">
              Reset your password
            </h4>
          </div>

          <FormField
            control={resetPasswordForm.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter the One-Time Password</FormLabel>
                <FormControl>
                  <InputOTP maxLength={6} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Enter the 6-digit code sent to your email
                </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col space-y-4">
            <FormField
              control={resetPasswordForm.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="new password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={resetPasswordForm.control}
              name="confirmNewPassword"
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
          </div>
          <Button type="submit" className="w-full">
            Reset Password
          </Button>
        </form>
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

export default ResetPassword;
