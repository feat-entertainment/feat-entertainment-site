import Image from "next/image";
import { Gamepad2, Cpu, Home } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { businessDomains } from "@/data/business";

const ICONS = {
  entertainment: Gamepad2,
  technology: Cpu,
  life: Home,
} as const;

const MEDIA: Record<string, { type: "photo"; src: string; alt: string } | { type: "graphic" }> = {
  entertainment: {
    type: "photo",
    src: "/images/photos/entertainment.webp",
    alt: "ゲーム・音楽・映像制作を行うクリエイティブワークスペース",
  },
  technology: { type: "graphic" },
  life: {
    type: "photo",
    src: "/images/photos/life-inset.webp",
    alt: "夕暮れの日本の住まい",
  },
};

function LineMotif() {
  return (
    <svg viewBox="0 0 240 64" className="w-full max-w-[220px]" aria-hidden="true">
      <circle cx="14" cy="32" r="7" fill="var(--color-navy)" />
      <line x1="28" y1="32" x2="212" y2="32" stroke="var(--color-navy)" strokeWidth="1.5" />
      <circle cx="226" cy="32" r="7" fill="var(--color-teal)" />
    </svg>
  );
}

export function BusinessSection() {
  return (
    <section id="business" className="py-24 sm:py-32 bg-white scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Business"
          title="できることではなく、役に立てることを。"
          lead="現在の事業と、これから挑んでいく領域を分けて紹介しています。まだ形になっていないものも、私たちが大切にしたい方向として掲げています。"
        />

        <ul className="mt-16 flex flex-col">
          {businessDomains.map((domain, index) => {
            const Icon = ICONS[domain.id as keyof typeof ICONS];
            const media = MEDIA[domain.id];
            const numeral = String(index + 1).padStart(2, "0");
            const onPhoto = media.type === "photo";

            const header = (
              <div className="flex items-start gap-5">
                <span
                  aria-hidden="true"
                  className={`text-5xl sm:text-6xl font-bold leading-none select-none ${
                    onPhoto ? "text-white/20" : "text-navy/10"
                  }`}
                >
                  {numeral}
                </span>
                <div className="pt-1">
                  <Icon
                    aria-hidden="true"
                    size={24}
                    strokeWidth={1.6}
                    className={onPhoto ? "text-teal-light" : "text-teal"}
                  />
                  <h3 className={`mt-3 text-xl sm:text-2xl font-semibold ${onPhoto ? "text-white" : "text-navy"}`}>
                    {domain.title}
                  </h3>
                  <p className={`mt-1 text-sm ${onPhoto ? "text-white/70" : "text-ink-soft"}`}>
                    {domain.titleJa}
                  </p>
                </div>
              </div>
            );

            const threads = (
              <ul
                className={`mt-5 flex flex-col gap-3 border-t pt-5 ${
                  onPhoto ? "border-white/20" : "border-line"
                }`}
              >
                {domain.threads.map((thread) => (
                  <li key={thread.label} className="flex items-center justify-between gap-3">
                    <span className={`text-sm ${onPhoto ? "text-white/90" : "text-ink"}`}>
                      {thread.label}
                    </span>
                    <span
                      className={`shrink-0 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-sm ${
                        thread.status === "now"
                          ? onPhoto
                            ? "bg-white text-navy"
                            : "bg-navy text-white"
                          : onPhoto
                            ? "border border-white/40 text-white/80"
                            : "border border-teal/40 text-teal-text"
                      }`}
                    >
                      {thread.status === "now" ? "Now" : "Next"}
                    </span>
                  </li>
                ))}
              </ul>
            );

            const description = (
              <p
                className={`text-sm sm:text-base leading-relaxed max-w-md ${
                  onPhoto ? "text-white/85" : "text-ink-soft"
                }`}
              >
                {domain.description}
              </p>
            );

            return (
              <Reveal as="li" key={domain.id} delay={index * 0.08} className="border-t border-line last:border-b py-10 sm:py-14">
                {media.type === "photo" ? (
                  <div className="relative min-h-[420px] sm:min-h-[460px] overflow-hidden rounded-lg">
                    <Image
                      src={media.src}
                      alt={media.alt}
                      fill
                      sizes="(min-width: 1024px) 1100px, 100vw"
                      className="object-cover"
                    />
                    <div aria-hidden="true" className="absolute inset-0 bg-navy/70" />
                    <div className="relative z-10 flex h-full flex-col justify-between gap-8 p-8 sm:p-12 lg:p-14">
                      {header}
                      <div>
                        {description}
                        {threads}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="min-h-[420px] sm:min-h-[460px] overflow-hidden rounded-lg border border-line bg-mist/60">
                    <div className="flex h-full flex-col justify-between gap-8 p-8 sm:p-12 lg:p-14">
                      {header}
                      <div className="flex justify-center py-4 opacity-70">
                        <LineMotif />
                      </div>
                      <div>
                        {description}
                        {threads}
                      </div>
                    </div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
