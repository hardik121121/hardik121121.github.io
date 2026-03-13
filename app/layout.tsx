import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { type Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  description: "Portfolio of Hardik Arora, AI/ML Engineer",
  title: "Hardik Arora",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} grid min-h-screen grid-rows-[auto_1fr_auto]`}
      >
        <div className="absolute -z-10 h-full w-full bg-[radial-gradient(#D8E5F2B3_1px,transparent_1px)] mask-[radial-gradient(ellipse_50%_75%_at_50%_50%,#000_70%,transparent_100%)] bg-size-[20px_20px] dark:bg-[radial-gradient(#ffffff25_1px,transparent_1px)]" />
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            <Navbar />
            {children}
            <Footer />
            <Analytics />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
