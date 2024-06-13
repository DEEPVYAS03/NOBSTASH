import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../redux/dispatch/useAuth';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import ReCAPTCHA from 'react-google-recaptcha';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1).max(50),
});

const Login = () => {
  const nav = useNavigate();

  const { auth, login } = useAuth();
  const [isCaptchaVerifed, setIsCaptchaVerifed] = useState(false);

  const loginForm = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(values) {
    if (!isCaptchaVerifed) {
      toast.error('Please verify captcha');
      return;
    }
    const isSuccessed = await login(values.email, values.password);
    if (isSuccessed) {
      nav('/');
    }
  }

  function onChangeCaptacha(value) {
    console.log('Captcha value:', value);
    setIsCaptchaVerifed(true);
  }

  if (auth.token && auth.user) nav('/');

  return (
    <div className="flex h-screen min-h-screen w-full flex-col items-center justify-center">
      <h2 className="mb-20 text-center text-5xl font-bold text-gray-800">
        Nobstash
      </h2>

      <Form {...loginForm}>
        <form
          onSubmit={loginForm.handleSubmit(onSubmit)}
          className="container w-full max-w-sm space-y-4"
        >
          <div className="mb-10">
            <h4 className="text-center text-xl font-bold">Login</h4>
            <p className="cursor-pointer text-center text-sm text-gray-600">
              Login to your account
            </p>
          </div>

          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={loginForm.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="password"
                    {...field}
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChangeCaptacha}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={!isCaptchaVerifed}
          >
            Continue
          </Button>
        </form>{' '}
      </Form>

      <p className="mt-5 cursor-pointer text-center text-sm text-gray-600">
        Not have an account?{' '}
        <Button
          variant="link"
          className="px-0 font-semibold underline"
          onClick={() => nav('/signup')}
        >
          Signup
        </Button>{' '}
        here
      </p>

      <Button
        variant="link"
        className="text-sm underline"
        onClick={() => nav('/forgot-password')}
      >
        Forgot Password
      </Button>

      <p className="mt-5 text-center text-xs text-gray-500">
        By clicking continue, you agree to our{' '}
        <Button
          variant="link"
          className="p-0 text-xs"
        >
          {' '}
          Terms of Service
        </Button>{' '}
        and{' '}
        <Button
          variant="link"
          className="p-0 text-xs"
        >
          Privacy Policy
        </Button>
      </p>
    </div>
  );
};

export default Login;
