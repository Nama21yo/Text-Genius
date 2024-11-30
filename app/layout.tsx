import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import TopNav from "@/components/nav/top-nav";
import { ThemeProvider } from "@/components/theme-provider";
import { UsageProvider } from "@/context/usage";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Text Genius",
  description: "An AI-based Text Generation Project",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <UsageProvider>
              <header>
                <TopNav />
              </header>
              <main>{children}</main>
            </UsageProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
