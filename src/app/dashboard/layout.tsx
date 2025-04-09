// src/app/dashboard/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookEase - Dashboard",
  description: "Manage your salon appointments",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={`${inter.className} bg-neutral-50`}>{children}</div>;
}
