'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  DocumentMagnifyingGlassIcon,
  ClipboardDocumentListIcon,
  ChevronLeftIcon,
  ArrowRightOnRectangleIcon,
  PlusCircleIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';

const links = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Tracking AWB', href: '/dashboard/tracking', icon: DocumentMagnifyingGlassIcon },
  { name: 'Status Kargo', href: '/dashboard/status', icon: MapPinIcon },
  { name: 'Tambah Shipment', href: '/dashboard/manifest', icon: PlusCircleIcon },
];

export default function SideNav() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="flex h-full flex-col transition-all duration-300"
      style={{
        background: 'linear-gradient(180deg, #0f2044 0%, #1a3a6e 100%)',
        width: collapsed ? '70px' : '260px',
        minHeight: '100vh',
      }}
    >
      <Link href="/" className="flex items-center gap-3 px-4 py-5 border-b border-blue-700/40">
        <Image src="/images/Logo.png" alt="logo" width={40} height={40} className="rounded-lg flex-shrink-0" />
        {!collapsed && (
          <div className="leading-tight overflow-hidden">
            <div className="font-bold text-white text-sm whitespace-nowrap">SkySend Expedition</div>
            <div className="text-xs text-blue-300 tracking-widest whitespace-nowrap">AIR CARGO SYSTEM</div>
          </div>
        )}
      </Link>

      {!collapsed && (
        <div className="px-4 pt-5 pb-2">
          <span className="text-xs text-blue-400 font-semibold tracking-widest">MENU</span>
        </div>
      )}

      <nav className="flex flex-col gap-1 px-2 flex-grow mt-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 font-medium text-sm ${
                isActive
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'text-blue-200 hover:bg-blue-700/50 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              {!collapsed && <span className="whitespace-nowrap">{link.name}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="px-2 pb-4 flex flex-col gap-2">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-3 rounded-lg text-red-300 hover:bg-red-900/30 hover:text-red-200 transition-all text-sm font-medium"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 flex-shrink-0" />
          {!collapsed && <span>Keluar</span>}
        </Link>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-blue-400 hover:bg-blue-700/30 transition-all text-sm w-full"
        >
          <ChevronLeftIcon className={`w-5 h-5 flex-shrink-0 transition-transform ${collapsed ? 'rotate-180' : ''}`} />
          {!collapsed && <span>Collapse</span>}
        </button>
      </div>
    </div>
  );
}