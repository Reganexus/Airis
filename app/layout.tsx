import type { Metadata } from "next";
import Head from "next/head";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "airis",
  description: "An AI Chatbot called ByteBot, powered by OpenAI",
  icons: "/public/airis_logo_sq_trans.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="icon" href="/airis_logo_sq_trans.png" sizes="any" />
      </head>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </>
  );
}
