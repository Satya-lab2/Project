import '@/app/ui/global.css';
import 'leaflet/dist/leaflet.css';
import { inter } from '@/app/ui/fonts';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    template: '%s | SkySend Expedition',
    default: 'SkySend Expedition — Air Cargo System',
  },
  description: 'Sistem Informasi Manajemen Kargo Udara — SkySend Expedition',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
