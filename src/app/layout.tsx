import type { Metadata } from "next";
import { Poppins, Pixelify_Sans } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-pixelify-sans",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const ogImage = "https://opengraph.b-cdn.net/production/images/eb2472d0-8c3f-40b6-b5c9-62393f6155b8.svg?token=XxnmoWiLW2XSvhGryRs57u_TEOIP8aN5-N3vLCQ1UUk&height=30&width=39&expires=33286786998";

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
      </head>
      <body
        className={`${poppins.variable} ${pixelifySans.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}