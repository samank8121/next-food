'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn, toTitleCase } from '@/lib/utils';

const navigation = [
  { name: "home", href: '/' },
  { name: "food", href: '/foods' },
  { name: "category", href: '/categories' },
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className='container fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <nav className='container flex h-16 items-center justify-between px-4 md:px-6'>
        
        {/* Desktop Navigation */}
        <div className='hidden md:flex md:items-center md:space-x-8'>
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href
                  ? 'text-foreground'
                  : 'text-muted-foreground'
              )}
            >
              {toTitleCase(item.name)}
            </Link>
          ))}
        </div>

        <div className='flex items-center space-x-4'>
          <ThemeToggle />

          {/* Mobile menu button */}
          <Button
            variant='ghost'
            size='sm'
            className='md:hidden'
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className='h-5 w-5' />
            ) : (
              <Menu className='h-5 w-5' />
            )}
            <span className='sr-only'>Toggle menu</span>
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className='md:hidden'>
          <div className='space-y-1 px-4 pb-3 pt-2'>
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-muted',
                  pathname === item.href
                    ? 'text-foreground bg-muted'
                    : 'text-muted-foreground'
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {toTitleCase(item.name)}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
export default Navigation;
