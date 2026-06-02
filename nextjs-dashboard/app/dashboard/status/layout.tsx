import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Status Pengiriman',
  description: 'Monitor status pengiriman kargo udara — SkySend Expedition',
};

export default function StatusLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
