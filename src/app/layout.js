import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "mdFileGenerator",
    template: "%s | mdFileGenerator",
  },
  description: "Generate clean, professional Markdown (MD) README files for GitHub projects easily.",
  keywords: [
    "Markdown Generator",
    "GitHub README Generator",
    "MD File Generator",
    "Open Source Tools",
    "Next.js Tools",
  ],
  authors: [{ name: "mdFileGenerator Team" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "mdFileGenerator",
    description: "Generate professional Markdown README files for GitHub projects.",
    url: "https://mdfilegenerator.vercel.app",
    siteName: "mdFileGenerator",
    images: [
      {
        url: "https://mdfilegenerator.vercel.app/og.png",
        width: 1200,
        height: 630,
        alt: "mdFileGenerator Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "mdFileGenerator",
    description: "Generate professional Markdown README files for GitHub projects.",
    images: ["https://mdfilegenerator.vercel.app/og.png"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
