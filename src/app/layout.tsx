import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "../contexts/auth-context";

export const metadata: Metadata = {
  title: "Booking System",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
