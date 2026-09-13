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

export function BusinessSection() {
  return (
    <section id="business" className="py-24 sm:py-32 bg-white scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Business"
          title="できることではなく、役に立てることを。"
          lead="現在の事業と、これから挑んでいく領域を分けて紹介しています。まだ形になっていないものも、私たちが大切にしたい方向として掲げています。"
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {businessDomains.map((domain, index) => {
            const Icon = ICONS[domain.id as keyof typeof ICONS];
            return (
              <Reveal key={domain.id} delay={index * 0.1} className="flex flex-col gap-5">
                <Icon aria-hidden="true" size={28} strokeWidth={1.6} className="text-teal" />
                <div>
                  <h3 className="text-xl font-semibold text-navy">{domain.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{domain.titleJa}</p>
                </div>
                <p className="text-sm text-ink-soft leading-relaxed">{domain.description}</p>

                <ul className="mt-2 flex flex-col gap-3 border-t border-line pt-5">
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
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
