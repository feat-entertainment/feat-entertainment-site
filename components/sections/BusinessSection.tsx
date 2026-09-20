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
            const imageOnRight = index % 2 === 0;

            const textBlock = (
              <div className="flex flex-col gap-5">
                <div className="flex items-start gap-5">
                  <span
                    aria-hidden="true"
                    className="text-5xl sm:text-6xl font-bold leading-none text-navy/10 select-none"
                  >
                    {numeral}
                  </span>
                  <div className="pt-1">
                    <Icon aria-hidden="true" size={24} strokeWidth={1.6} className="text-teal" />
                    <h3 className="mt-3 text-xl font-semibold text-navy">{domain.title}</h3>
                    <p className="mt-1 text-sm text-ink-soft">{domain.titleJa}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-ink-soft leading-relaxed max-w-md">
                  {domain.description}
                </p>

                <ul className="mt-1 flex flex-col gap-3 border-t border-line pt-5 max-w-md">
                  {domain.threads.map((thread) => (
                    <li key={thread.label} className="flex items-center justify-between gap-3">
                      <span className="text-sm text-ink">{thread.label}</span>
                      <span
                        className={`shrink-0 text-[11px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-sm ${
                          thread.status === "now"
                            ? "bg-navy text-white"
                            : "border border-teal/40 text-teal-text"
                        }`}
                      >
                        {thread.status === "now" ? "Now" : "Next"}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            );

            const mediaBlock =
              media.type === "photo" ? (
                <div className="relative aspect-[6/5] w-full overflow-hidden rounded-lg">
                  <Image
                    src={media.src}
                    alt={media.alt}
                    fill
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-full min-h-[220px] items-center justify-center rounded-lg border border-line bg-mist/60 px-10 py-14">
                  <svg viewBox="0 0 240 64" className="w-full max-w-xs" aria-hidden="true">
                    <circle cx="14" cy="32" r="7" fill="var(--color-navy)" />
                    <line
                      x1="28"
                      y1="32"
                      x2="212"
                      y2="32"
                      stroke="var(--color-navy)"
                      strokeWidth="1.5"
                    />
                    <circle cx="226" cy="32" r="7" fill="var(--color-teal)" />
                  </svg>
                </div>
              );

            return (
              <Reveal as="li" key={domain.id} delay={index * 0.08} className="border-t border-line last:border-b">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center py-12 sm:py-16">
                  <div className={imageOnRight ? "lg:order-1" : "lg:order-2"}>{textBlock}</div>
                  <div className={imageOnRight ? "lg:order-2" : "lg:order-1"}>{mediaBlock}</div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
