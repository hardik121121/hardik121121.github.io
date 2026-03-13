import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  description: "Portfolio of Hardik Arora, Front-End Developer",
  title: "Hardik Arora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} grid min-h-screen grid-rows-[auto_1fr_auto]`}
      >
        <div className="absolute -z-10 h-full w-full bg-[radial-gradient(#D8E5F2B3_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_75%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[20px_20px] dark:bg-[radial-gradient(#ffffff25_1px,transparent_1px)]" />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
