import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { workItems } from "@/data/works";

export function WorksSection() {
  return (
    <section id="works" className="py-24 sm:py-32 bg-mist scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Works"
          title="これまでの取り組み。"
          lead="今後、AIサービス・音楽・映像などの実績もここに加えていきます。"
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {workItems.map((work, index) => {
            const content = (
              <>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-text">
                  {work.category}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-navy">{work.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{work.description}</p>
              </>
            );

            return (
              <Reveal key={work.id} delay={index * 0.08}>
                {work.href ? (
                  <a
                    href={work.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex h-full flex-col justify-between border border-line bg-white p-7 transition-colors hover:border-teal/50"
                  >
                    <div>{content}</div>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-navy">
                      詳しく見る
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </a>
                ) : (
                  <div className="flex h-full flex-col justify-between border border-line bg-white p-7">
                    <div>{content}</div>
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
