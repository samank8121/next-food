'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant='ghost'
      size='sm'
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <div key={theme} className='relative'>
        <Sun className='h-5 w-5 scale-100 animate-[theme-scale-rotate_2s_5] dark:scale-0' />
        <Moon className='absolute top-0 h-5 w-5 animate-[theme-scale-rotate_2s_5] scale-0 dark:rotate-0 dark:scale-100' />
      </div>
      <span className='sr-only'>Toggle theme</span>
    </Button>
  );
}
