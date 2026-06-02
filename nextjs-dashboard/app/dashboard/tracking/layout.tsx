import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tracking AWB',
  description: 'Lacak status pengiriman kargo udara berdasarkan nomor AWB — SkySend Expedition',
};

export default function TrackingLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
