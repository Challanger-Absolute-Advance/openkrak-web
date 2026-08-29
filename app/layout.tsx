import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "OpenKrak — AI Coding Agent",
  description: "AI coding assistant with Power Mode. Pre-computes repo analysis for faster, cheaper LLM responses.",
  keywords: ["ai", "coding", "cli", "power mode", "opencode"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Script src="https://payhip.com/embed-page.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
