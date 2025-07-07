 
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { createClient } from '@/lib/supabase/server';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';

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

export async function googleSignIn() {
  const header = await headers();
  const origin = header.get('origin');
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect('/error');
  }

  return redirect(data.url);
}

export async function githubSignIn() {
  const header = await headers();
  const origin = header.get('origin');
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: `${origin}/auth/callback`,
      //redirectTo: 'https://pmgoqtcxvhweexmlpgrs.supabase.co/auth/v1/callback'
    },
  });

  if (error) {
    redirect('/error');
  }

  return redirect(data.url);
}
