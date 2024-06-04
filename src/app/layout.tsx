import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/Layout/Header";
import Head from "next/head";
import NextAuthProvider from "@/providers/NextAuth";

export const metadata: Metadata = {
  title: "INTELTS",
  description: "Websites for practicing IELTS and Behavioral Interview",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <Header/>
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
