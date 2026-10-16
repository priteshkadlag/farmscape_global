import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "light" | "outline" | "outline-light" | "ghost";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-brand-700",
  light: "bg-paper text-ink hover:bg-white",
  outline: "border border-ink/25 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white hover:text-ink",
  ghost: "text-ink hover:text-brand",
};

const baseClass =
  "group/btn inline-flex min-h-12 items-center justify-center gap-3 px-6 text-[0.95rem] font-medium tracking-tight transition-colors duration-300 ease-[var(--ease-precise)]";

type CommonProps = { variant?: Variant; icon?: ReactNode | false; magnetic?: boolean; className?: string; children: ReactNode };

function Inner({ children, icon }: { children: ReactNode; icon?: ReactNode | false }) {
  return (
    <>
      <span>{children}</span>
      {icon !== false && (
        <span className="relative inline-flex size-4 overflow-hidden" aria-hidden="true">
          {icon ?? (
            <>
              <ArrowUpRight className="size-4 transition-transform duration-300 ease-[var(--ease-precise)] group-hover/btn:translate-x-4 group-hover/btn:-translate-y-4" />
              <ArrowUpRight className="absolute size-4 -translate-x-4 translate-y-4 transition-transform duration-300 ease-[var(--ease-precise)] group-hover/btn:translate-x-0 group-hover/btn:translate-y-0" />
            </>
          )}
        </span>
      )}
    </>
  );
}

/** Link styled as a button. External/tel/mailto links render a plain anchor. */
export function ButtonLink({
  href,
  variant = "primary",
  icon,
  magnetic,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<"a">, "className" | "children">) {
  const cls = cn(baseClass, styles[variant], className);
  const isInternal = href?.startsWith("/") && !href.startsWith("//") && !/\.(pdf|jpe?g|png)$/i.test(href);
  const el = isInternal ? (
    <Link href={href!} className={cls} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </Link>
  ) : (
    <a href={href} className={cls} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </a>
  );
  return magnetic ? <Magnetic>{el}</Magnetic> : el;
}

export function Button({
  variant = "primary",
  icon,
  className,
  children,
  ...rest
}: CommonProps & Omit<ComponentProps<"button">, "className" | "children">) {
  return (
    <button className={cn(baseClass, styles[variant], "disabled:cursor-not-allowed disabled:opacity-60", className)} {...rest}>
      <Inner icon={icon}>{children}</Inner>
    </button>
  );
}
