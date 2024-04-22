import { AppConfig } from '@/app.config';
import MobileNav from './mobile-nav';
import { ProfileIcon } from './profile-icon';
import Link from 'next/link';
import { ThemeSwitcher } from './theme-switcher';

export function Header() {
  return (
    <header className="border-b ">
      <div className="container h-16 flex justify-between items-center gap-4">
        <p className="font-bold text-lg">
          <Link href={'/'}>{AppConfig.title}</Link>
        </p>
        <div className="hidden lg:flex items-center gap-4">
          John Doe
          <ProfileIcon />
          <ThemeSwitcher />
        </div>
        <div className="lg:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
