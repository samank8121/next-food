'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server';
import { type SignInWithPasswordCredentials } from '@supabase/supabase-js';

export async function login(formData: FormData) {
  const supabase = await createClient();

  // type-safe validation using Zod
  const data = Object.fromEntries(formData.entries());

  const { error } = await supabase.auth.signInWithPassword(data as unknown as SignInWithPasswordCredentials);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = await createClient();

  // type-safe validation using Zod
  const data = Object.fromEntries(formData.entries());

  const { error } = await supabase.auth.signUp(data as unknown as SignInWithPasswordCredentials);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
