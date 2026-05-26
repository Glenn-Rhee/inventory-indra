import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/Providers";
import { Metadata } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Inventory Indra",
    template: "%s | Inventory Indra",
  },
  description:
    "Sistem manajemen inventaris untuk memantau stok produk, transaksi, dan laporan bisnis secara efisien.",
  keywords: [
    "inventory",
    "manajemen stok",
    "sistem inventaris",
    "inventory management",
    "transaksi produk",
  ],
  authors: [{ name: "Ariel Rizki Muhtamad Bakri" }],
  creator: "Ariel Rizki Muhtamad Bakri",
  metadataBase: new URL("https://inventory-indra.vercel.app"),
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://inventory-indra.vercel.app",
    title: "Inventory Indra",
    description:
      "Sistem manajemen inventaris untuk memantau stok produk, transaksi, dan laporan bisnis secara efisien.",
    siteName: "Inventory Indra",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/icon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      {
        url: "/icons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
        <Toaster
          position="top-center"
          toastOptions={{
            classNames: {
              error: "!bg-destructive/90 !text-white !border-destructive/50",
              success: "!bg-secondary/90 !text-white !border-secondary/50",
              warning: "!bg-chart-3 !text-white !border-chart-3/50",
              info: "!bg-primary/90 !text-white !border-primary/50",
            },
          }}
        />
      </body>
    </html>
  );
}
