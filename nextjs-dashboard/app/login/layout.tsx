import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login Supervisor | SkySend Expedition',
  description: 'Halaman login untuk supervisor dan administrator SkySend Expedition',
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
