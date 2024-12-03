// app/layout.tsx
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import Providers from "./_components/providers";
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Home | TXS",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/Icon.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Providers>
          <TRPCReactProvider>{children}</TRPCReactProvider>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
