/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn, toTitleCase } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui/navigation-menu';
import { createClient } from '@/lib/supabase/client';
import { logout } from '@/app/actions/auth';

const navigation = [
  { name: 'home', href: '/' },
  { name: 'food', href: '/foods' },
  { name: 'category', href: '/categories' },
];

const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const supabase = createClient();
    const getUser = async () => {      
      const { data } = await supabase.auth.getUser();
      console.log('User data:', data);
      setUser(data.user);
    };
    getUser();
  }, [pathname]);

  return (
    <header className='container flex-col md:flex md:flex-row m-auto fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <NavigationMenu className='hidden max-w-none h-16 px-4 md:px-6 md:flex md:justify-start'>
        <NavigationMenuList className='flex'>
          {navigation.map((item) => (
            <NavigationMenuItem key={item.name}>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href={item.href}>{toTitleCase(item.name)}</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <div className='flex items-center space-x-4 w-full md:w-1/2 justify-between md:justify-end'>
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
        <ThemeToggle />
        {user ? (
          <form action={logout}>
            <Button variant='ghost' size='sm'>
              Logout
            </Button>
          </form>
        ) : (
          <div className='flex items-center space-x-2'>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/login'>Login</Link>
            </Button>
            <Button variant='ghost' size='sm' asChild>
              <Link href='/signup'>Sign Up</Link>
            </Button>
          </div>
        )}
      </div>

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
