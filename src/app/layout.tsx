import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NCTIRS - National Cyber Threat Intelligence & Response System",
  description: "AI-Driven National Cyber Threat Intelligence and Response System for Kenya",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="scanlines"></div>
        <div className="flex h-screen overflow-hidden bg-[var(--background)] text-[var(--foreground)]">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header />
            <main className="flex-1 overflow-y-auto p-6 bg-[var(--background)]">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
