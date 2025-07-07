import "./globals.css";
import ThemeWrapper from "./ThemeWrapper";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terminal Portfolio",
  description: "A personal terminal-style website built with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-mono transition-colors duration-300">
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
}
