"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { navItems } from "@/data/nav";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 backdrop-blur-sm border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <Container>
        <div className="flex h-16 sm:h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-sm"
            aria-label="feat.Entertainment合同会社 トップへ"
          >
            <Logo variant="mark" theme="navy" priority className="h-8 sm:h-9 w-auto" />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="メインナビゲーション">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-ink hover:text-teal-text transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-sm p-2 text-navy"
            aria-label={menuOpen ? "メニューを閉じる" : "メニューを開く"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {menuOpen ? (
        <nav
          id="mobile-nav"
          aria-label="モバイルナビゲーション"
          className="md:hidden bg-white border-t border-line"
        >
          <Container>
            <ul className="flex flex-col py-4">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block py-3 text-base font-medium text-ink hover:text-teal-text transition-colors"
                    onClick={() => setMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </nav>
      ) : null}
    </header>
  );
}
