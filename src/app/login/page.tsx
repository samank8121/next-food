import { LoginForm } from '@/components/auth/login-form';

export default function LoginPage() {
  return (
    <div className='container mx-auto py-10'>
      <h1 className='text-2xl font-bold mb-6'>Login</h1>
      <LoginForm />
    </div>
  );
}
