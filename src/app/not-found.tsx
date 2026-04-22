import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-dvh min-w-dvw flex items-center flex-col gap-y-3 justify-center">
      <h1 className="text-5xl font-bold text-primary flex items-center gap-x-2">
        <span>404</span> - <span className="text-3xl">Page Not Found</span>
      </h1>
      <Link
        href={"/"}
        className={buttonVariants({
          size: "lg",
          className: "text-xl font-semibold px-4 py-5",
        })}
      >
        Go Home
      </Link>
    </div>
  );
}
