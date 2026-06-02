import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelola AWB',
  description: 'Kelola data Airway Bill (AWB) pengiriman kargo udara — SkySend Expedition',
};

export default function ManifestLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
