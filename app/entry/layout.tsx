import type { Metadata } from "next";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "airis",
  description: "An AI Chatbot called Airis, powered by OpenAI",
  icons: "/public/airis_logo_sq_trans.png",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className={`${outfit.className} bg-slate-100`}>{children}</main>;
}
