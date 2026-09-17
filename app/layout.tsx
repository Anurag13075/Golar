import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Fasal Rakshak — AI Crop Insurance Claim Agent",
  description:
    "Save your PMFBY crop insurance claim before the 72-hour window expires. AI-powered voice + camera agent for Indian farmers.",
  keywords: [
    "PMFBY",
    "crop insurance",
    "fasal bima",
    "farmer",
    "claim",
    "AI",
    "India",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="min-h-full flex flex-col font-sans bg-[#0F1729] text-white">
        {children}
      </body>
    </html>
  );
}
