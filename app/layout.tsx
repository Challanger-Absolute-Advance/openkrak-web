import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "OpenKrak",
  description: "MCP server for developer tooling. Static analysis via the Dorchester engine — delivered to your coding agent before any file is read.",
  keywords: ["mcp", "developer tools", "static analysis", "opencode", "coding agent"],
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
