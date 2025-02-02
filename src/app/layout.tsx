// app/layout.tsx
import "@/styles/globals.css";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { TRPCReactProvider } from "@/trpc/react";
import Providers from "./_components/providers";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Home | TXS",
  description:
    "Explore TXS - your gateway to smarter investing and networking. Access real-time market data, connect with fellow investors, and leverage AI tools to stay ahead. Elevate your investment journey with TXS.",
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
