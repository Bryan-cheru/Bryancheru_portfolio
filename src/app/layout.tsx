import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Brian Cheruiyot - Software Engineer",
  description: "Software Engineer specializing in full-stack development, AI trading systems, and cloud computing. Recent graduate with expertise in Python, C#, JavaScript, and modern web technologies.",
  keywords: "Brian Cheruiyot, Software Engineer, Full Stack Developer, AI Trading, Python, C#, JavaScript, React, Next.js, Nairobi Kenya",
  authors: [{ name: "Brian Cheruiyot" }],
  openGraph: {
    title: "Brian Cheruiyot - Software Engineer",
    description: "Software Engineer specializing in full-stack development, AI trading systems, and cloud computing.",
    type: "website",
  },
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
        {children}
      </body>
    </html>
  );
}
