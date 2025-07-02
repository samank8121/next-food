import { SignUpForm } from '@/components/auth/signup-form';

export default function SignUpPage() {
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-6'>Sign Up</h1>
      <SignUpForm />
    </div>
  );
}
