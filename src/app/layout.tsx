import type { Metadata } from "next";
import { Inter, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const ogImage = "https://opengraph.b-cdn.net/production/images/e40efc77-0740-4c48-b3f8-f8cc5c1d5720.png?token=I0ecXikVP-poYNtEyFMuJyPRCVQ6JdgFd7tHAt_3iJk&height=730&width=1200&expires=33286790432";

export const metadata: Metadata = {
  title: "The Red Guild",
  description: "The Red Guild (TRG) advances security, education, and open-source tools in the crypto ecosystem. Challenges, resources, and audits for the community.",
  openGraph: {
    url: siteUrl,
    type: "website",
    title: "The Red Guild",
    description: "The Red Guild (TRG) advances security, education, and open-source tools in the crypto ecosystem. Challenges, resources, and audits for the community.",
    images: [
      {
        url: ogImage,
        width: 39,
        height: 30,
        alt: "The Red Guild Logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "The Red Guild",
    description: "The Red Guild (TRG) advances security, education, and open-source tools in the crypto ecosystem. Challenges, resources, and audits for the community.",
    images: [
      ogImage
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Add any necessary meta tags here */}
        <link rel="icon" href="/assets/navbar-logo.svg" type="image/svg+xml" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Spartan:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${inter.variable} ${pixelifySans.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}