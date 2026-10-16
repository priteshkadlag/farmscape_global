"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { contact, mainNav, type NavItem } from "@/content/site";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/icons";
import { Logo } from "./Logo";

const isActive = (pathname: string, href: string) => (href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/"));

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu on navigation.
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMobileOpen(false);
  }

  const solid = scrolled || mobileOpen;

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-300",
        solid ? "bg-paper/95 text-ink shadow-[0_1px_0_rgb(18_19_24/0.08)] backdrop-blur-md" : "on-dark bg-transparent text-paper",
      )}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <Logo light={!solid} priority />

        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.children ? (
                <DesktopDropdown key={item.href} item={item} pathname={pathname} solid={solid} />
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={cn(
                      "relative inline-flex min-h-11 items-center px-3 text-sm font-medium transition-colors",
                      "after:absolute after:inset-x-3 after:bottom-2 after:h-px after:origin-left after:scale-x-0 after:bg-current after:transition-transform after:duration-300 hover:after:scale-x-100",
                      isActive(pathname, item.href) && "after:scale-x-100",
                      solid ? "hover:text-brand" : "hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ButtonLink href="/request-a-quote" variant={solid ? "primary" : "light"} className="min-h-11 whitespace-nowrap px-5 text-sm">
              Request a Quote
            </ButtonLink>
          </div>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center xl:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">{mobileOpen ? "Close menu" : "Open menu"}</span>
            {mobileOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

    </header>
    {/* Outside <header>: its backdrop-filter would otherwise trap position:fixed */}
    <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} pathname={pathname} />
    </>
  );
}

function DesktopDropdown({ item, pathname, solid }: { item: NavItem; pathname: string; solid: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  // A mouse click arrives right after hover opened the menu; don’t let it close it.
  const openedByHover = useRef(false);
  const menuId = useId();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = isActive(pathname, item.href);

  return (
    <li
      ref={ref}
      className="relative"
      onMouseEnter={() => {
        openedByHover.current = !open;
        setOpen(true);
      }}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => {
          if (openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          setOpen((o) => !o);
        }}
        className={cn(
          "inline-flex min-h-11 items-center gap-1 px-3 text-sm font-medium transition-colors",
          solid ? "hover:text-brand" : "hover:text-white",
          active && "underline decoration-1 underline-offset-[10px]",
        )}
      >
        {item.label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <m.ul
            id={menuId}
            initial={reduce ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 top-full w-60 border border-ink/10 bg-paper p-2 text-ink shadow-xl"
          >
            {item.children!.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  aria-current={pathname === c.href ? "page" : undefined}
                  className="flex min-h-11 items-center justify-between px-3 text-sm transition-colors hover:bg-concrete-100 aria-[current=page]:text-brand"
                  onClick={() => setOpen(false)}
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </m.ul>
        )}
      </AnimatePresence>
    </li>
  );
}

function MobileMenu({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel) {
        // Keep focus inside the open menu.
        const els = Array.from(panel.querySelectorAll<HTMLElement>("a,button"));
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id="mobile-menu"
          ref={panelRef}
          data-lenis-prevent
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-x-0 bottom-0 top-[var(--header-h)] z-40 overflow-y-auto bg-paper xl:hidden"
        >
          <nav aria-label="Mobile" className="container-site flex min-h-full flex-col py-6">
            <ul className="divide-y divide-ink/10 border-y border-ink/10">
              {mainNav.map((item, i) => (
                <m.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * i, duration: 0.3 }}
                >
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="flex min-h-14 items-center justify-between font-display text-2xl font-semibold tracking-tight aria-[current=page]:text-brand"
                    onClick={onClose}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-steel-500">{String(i + 1).padStart(2, "0")}</span>
                  </Link>
                  {item.children && (
                    <ul className="pb-3 pl-4">
                      {item.children
                        .filter((c) => c.href !== item.href)
                        .map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              aria-current={pathname === c.href ? "page" : undefined}
                              className="flex min-h-11 items-center text-steel-600 aria-[current=page]:text-brand"
                              onClick={onClose}
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  )}
                </m.li>
              ))}
            </ul>
            <div className="mt-8 grid gap-3">
              <ButtonLink href="/request-a-quote" onClick={onClose}>
                Request a Quote
              </ButtonLink>
              <div className="grid grid-cols-2 gap-3">
                <ButtonLink href={contact.phoneHref} variant="outline" icon={<Phone className="size-4" />}>
                  Call
                </ButtonLink>
                <ButtonLink href={contact.whatsappHref} target="_blank" rel="noopener noreferrer" variant="outline" icon={<WhatsAppIcon className="size-4" />}>
                  WhatsApp
                </ButtonLink>
              </div>
            </div>
          </nav>
        </m.div>
      )}
    </AnimatePresence>
  );
}
