import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lacak Kargo | SkySend Expedition',
  description: 'Lacak status pengiriman kargo udara Anda dengan nomor AWB — SkySend Expedition',
};

export default function LacakKargoLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
