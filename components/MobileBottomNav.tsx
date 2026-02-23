'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, User, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/products', label: 'Shop', icon: Search },
    { href: '/about', label: 'About', icon: User },
    { href: '/contact', label: 'Contact', icon: Phone },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[60] pb-[env(safe-area-inset-bottom)]">
      <div className="bg-background/80 backdrop-blur-xl border-t border-border/40 px-6 py-3 flex items-center justify-between shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const Active = isActive(item.href);
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className="flex flex-col items-center gap-1 group relative"
            >
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={cn(
                  "p-1.5 rounded-xl transition-colors",
                  Active ? "text-primary bg-primary/10" : "text-muted-foreground"
                )}
              >
                <item.icon className={cn("w-6 h-6", Active && "fill-current/10")} />
              </motion.div>
              <span className={cn(
                "text-[10px] font-bold tracking-tight transition-colors",
                Active ? "text-primary" : "text-muted-foreground"
              )}>
                {item.label}
              </span>
              {Active && (
                <motion.div 
                  layoutId="bottomNavDot"
                  className="absolute -top-1 w-1 h-1 rounded-full bg-primary" 
                />
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
