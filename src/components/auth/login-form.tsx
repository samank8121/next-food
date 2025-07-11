'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { login } from '@/app/actions/auth';
import { LoginSchema } from '@/lib/zod/schema/auth';

import { googleSignIn, githubSignIn } from '@/app/actions/auth';

export function LoginForm() {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    const formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    await login(formData);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Your email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder='Your password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' className='w-full mb-2'>Login</Button>
      </form>
      <div className='space-y-2 flex w-full gap-2'>
        <Button onClick={() => googleSignIn()} className='flex-1' >
          Sign in with Google
        </Button>
        <Button onClick={() => githubSignIn()} className='flex-1' >
          Sign in with GitHub
        </Button>
      </div>
    </Form>
  );
}
