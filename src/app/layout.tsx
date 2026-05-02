import { Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "@/components/Providers";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const dataSession = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      className={`${poppins.variable} font-sans h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers user={dataSession?.user ?? null}>{children}</Providers>
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
