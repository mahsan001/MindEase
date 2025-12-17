import type { Metadata } from "next";
import { Fraunces, Outfit } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/context/ToastContext";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"], // Enable soft and wonky axes for character
});

export const metadata: Metadata = {
  title: "MindEase | Find Your Balance",
  description: "A sanctuary for your mind. AI-assisted therapy, mindful journaling, and daily wellness.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${fraunces.variable} font-sans antialiased bg-background text-foreground selection:bg-primary/30`}>
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
