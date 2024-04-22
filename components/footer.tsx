import Link from 'next/link';
import { ThemeSwitcher } from './theme-switcher';
import { AppConfig } from '@/app.config';

export function Footer() {
  return (
    <footer className="border-t sticky top-full">
      <div className="container h-16 flex items-center align-center justify-center lg:justify-between">
        <p className="text-muted-foreground">
          &copy; 2024 <Link href={AppConfig.mySiteURL}>{AppConfig.myName}</Link>
        </p>
        <div className="hidden lg:flex items-center space-x-4 text-muted-foreground text-sm">
          <Link href={'/terms'}>利用規約</Link>
          <Link href={'/privacy'}>プライバシーポリシー</Link>
        </div>
      </div>
    </footer>
  );
}
