import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Header from "./header";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "airis landing page",
  description: "An AI Chatbot called Airis AI, powered by OpenAI Landing page",
};

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative">
      <Header />
      <main className={`${outfit.className} bg-slate-100`}>{children}</main>
    </div>
  );
}
