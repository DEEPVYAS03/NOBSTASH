import React, { useEffect } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';

import useAuth from '@/redux/dispatch/useAuth';
import { toast } from 'sonner';
import axiosInstance from '@/api/axois';

const profileFormSchema = z.object({
  name: z.string().min(3).max(50).optional(),
  username: z.string().min(3).max(50),
  email: z.string().email(),
  mobile: z.string().min(10).max(10).optional(),
  address: z.string().max(50).optional(),
  pincode: z.string().min(6).max(6).optional(),
});

function Profile() {
  const { auth, setAuth } = useAuth();
  const profileForm = useForm({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      mobile: '',
      address: '',
      pincode: '',
    },
  });

  useEffect(() => {
    if (auth.user) {
      profileForm.setValue('name', auth.user.name);
      profileForm.setValue('username', auth.user.userName);
      profileForm.setValue('email', auth.user.email);
      profileForm.setValue('mobile', auth.user.phone);
      profileForm.setValue('address', auth.user.address);
      profileForm.setValue('pincode', auth.user.pincode);
    }
  }, []);

  async function onSubmit(values) {
    const result = await axiosInstance.put('user/update-detail', {
      name: values.name,
      userName: values.username,
      email: values.email,
      phone: values.mobile,
      address: values.address,
      pincode: values.pincode,
    });

    if (result.status === 200) {
      console.log('User updated successfully');
      toast.success('User updated successfully');
      setAuth(
        {
          ...auth.user,
          ...result.data.user,
        },
        auth.token
      );
    } else {
      console.log('User not updated');
      toast.error('User not updated');
    }
  }

  return (
    <>
      <div className="flex h-screen w-full">
        <div className="h-full"></div>
        <div className="flex w-full flex-col items-center">
          <h2 className="text-2xl font-bold">Profile</h2>

          <Form {...profileForm}>
            <form
              onSubmit={profileForm.handleSubmit(onSubmit)}
              className="container mt-10 w-full max-w-sm space-y-4"
            >
              <FormField
                control={profileForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="username"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
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
                control={profileForm.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile</FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        placeholder="mobile"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="address"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={profileForm.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pincode</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="pincode"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button variant="outline">Save Details</Button>
            </form>
          </Form>
        </div>
      </div>
      Ï
    </>
  );
}

export default Profile;
