import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kelola Pesawat',
  description: 'Manajemen armada pesawat kargo — SkySend Expedition',
};

export default function PesawatLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
