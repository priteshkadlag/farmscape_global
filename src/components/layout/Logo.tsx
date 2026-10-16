import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";

/** Formscape Global logo. `light` is the white variant for dark backgrounds. */
export function Logo({ light, className, priority }: { light?: boolean; className?: string; priority?: boolean }) {
  return (
    <Link href="/" className={cn("inline-flex shrink-0 items-center", className)} aria-label="Formscape Global — home">
      <Image
        src={light ? "/media/brand/formscape-global-logo-white.png" : "/media/brand/formscape-global-logo.png"}
        alt=""
        width={428}
        height={100}
        preload={priority}
        className="h-9 w-auto sm:h-10"
        sizes="172px"
      />
    </Link>
  );
}
