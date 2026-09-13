import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-white py-14">
      <Container>
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4">
            <Logo variant="mark" theme="navy" className="h-8 w-auto" />
            <div>
              <p className="text-sm font-semibold text-navy">{siteConfig.name}</p>
              <p className="mt-1 text-sm text-ink-soft">暮らしを少し、もっと豊かに。</p>
            </div>
          </div>

          <nav aria-label="フッターナビゲーション" className="flex gap-6">
            <Link
              href="/privacy"
              className="text-sm text-ink-soft hover:text-teal-text transition-colors"
            >
              Privacy Policy
            </Link>
            <a
              href={`mailto:${siteConfig.contactEmail}`}
              className="text-sm text-ink-soft hover:text-teal-text transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>

        <p className="mt-12 text-xs text-ink-soft">
          © {year} {siteConfig.nameEn}
        </p>
      </Container>
    </footer>
  );
}
