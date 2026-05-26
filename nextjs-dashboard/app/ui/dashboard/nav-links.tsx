'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  DocumentDuplicateIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Kelola AWB', href: '/dashboard/manifest', icon: DocumentDuplicateIcon },
  { name: 'Kelola Pesawat', href: '/dashboard/pesawat', icon: PaperAirplaneIcon },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href || (link.href !== '/dashboard' && pathname.startsWith(link.href));
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 transition-colors ${
              isActive ? 'bg-sky-100 text-blue-600' : 'bg-gray-50'
            }`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
