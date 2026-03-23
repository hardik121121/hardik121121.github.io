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
const siteUrl = "https://hardikarora.me";
const siteDescription =
  "Hardik Arora — AI/ML Engineer from Agra, India. Hands-on experience building and deploying ML models, passionate about scalable AI solutions.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Hardik Arora",
    template: "%s | Hardik Arora",
  },
  description: siteDescription,
  keywords: [
    "Hardik Arora",
    "AI Engineer",
    "ML Engineer",
    "Machine Learning",
    "Artificial Intelligence",
    "Deep Learning",
    "Python",
    "Portfolio",
    "Agra",
    "India",
  ],
  authors: [{ name: "Hardik Arora", url: siteUrl }],
  creator: "Hardik Arora",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Hardik Arora",
    title: "Hardik Arora — AI/ML Engineer",
    description: siteDescription,
    images: [
      {
        url: "/logo/image.svg",
        width: 1200,
        height: 630,
        alt: "Hardik Arora",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Hardik Arora — AI/ML Engineer",
    description: siteDescription,
    creator: "@HardikArora121",
    images: ["/logo/image.svg"],
  },
  alternates: {
    canonical: siteUrl,
  },
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
