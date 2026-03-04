import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/sessionProvider";
import { ThemeProvider } from "@/components/theme-provider";
import {QueryClient,QueryClientProvider} from "@tanstack/react-query";
import { Providers } from "@/components/providers";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Flagship - Feature Flag Management",
  description: "Modern feature flag management platform for developers",
};

const queryClient = new QueryClient();
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
       <Providers>{children}</Providers>
      </body>
    </html>
  );
}
