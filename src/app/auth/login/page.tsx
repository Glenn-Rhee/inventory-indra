import FormLogin from "@/components/pages/login/FormLogin";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login Page",
  description:
    "Masuk ke sistem untuk mengelola produk, memantau stok, dan mencatat transaksi dengan mudah dan aman.",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 via-white to-purple-50 p-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-120 h-120 bg-indigo-300/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-120 h-120 bg-purple-300/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative z-10">
        <Card className="border border-slate-200 shadow-xl backdrop-blur-xl bg-white/90 hover:shadow-2xl transition-all duration-300 rounded-2xl">
          <CardHeader className="text-center pt-8 pb-4">
            <CardTitle className="text-3xl font-bold text-primary">
              Sign In
            </CardTitle>
            <CardDescription className="text-slate-800 mt-2 px-10">
              Masuk untuk mengelola produk, stok, dan transaksi dalam satu
              dashboard.
            </CardDescription>
          </CardHeader>

          <CardContent className="px-8">
            <FormLogin />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
