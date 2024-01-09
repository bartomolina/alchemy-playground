import "@/app/globals.css";

import { Inter } from "next/font/google";

import { Client } from "@/app/client";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={inter.className}>
        <Client>{children}</Client>
      </body>
    </html>
  );
}
