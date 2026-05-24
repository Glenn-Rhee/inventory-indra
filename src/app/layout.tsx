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

export const metadata: Metadata = {}

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
