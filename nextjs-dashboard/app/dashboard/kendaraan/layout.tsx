import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelola Kendaraan',
  description: 'Manajemen kendaraan operasional kargo — SkySend Expedition',
};

export default function KendaraanLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
