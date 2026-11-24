
import type { Metadata } from "next";
import "../index.css";
import { AuthProvider } from "../context/AuthContext";

export const metadata: Metadata = {
  title: "Vendora | A marketplace for everyone",
  description: "A marketplace for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
      }
