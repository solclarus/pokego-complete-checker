import { AppConfig } from '@/app.config';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import Link from 'next/link';
import { ProfileIcon } from './profile-icon';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
        >
          <Menu size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="justify-start">
        <div className="flex flex-col">
          <div className="flex px-4 items-center gap-4 pb-6">
            <ProfileIcon />
            John Doe
          </div>
          <Button
            asChild
            variant="ghost"
            className="justify-start"
          >
            <Link href={'/terms'}>利用規約</Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="justify-start"
          >
            <Link href={'/privacy'}>プライバシーポリシー</Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
