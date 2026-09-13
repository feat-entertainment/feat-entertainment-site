import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { valueItems } from "@/data/values";

export function ValueSection() {
  return (
    <section id="mission" className="py-24 sm:py-32 bg-mist scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 sm:gap-8 pb-20 sm:pb-24 border-b border-line">
          <Reveal className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-text">
              Mission
            </span>
            <p className="text-2xl sm:text-3xl font-semibold leading-snug text-navy">
              暮らしを少し、
              <br />
              もっと豊かにする。
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col gap-3">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-text">
              Vision
            </span>
            <p className="text-2xl sm:text-3xl font-semibold leading-snug text-navy">
              関わるすべての人が、
              <br />
              昨日より少し豊かになれる未来。
            </p>
          </Reveal>
        </div>

        <div className="pt-20 sm:pt-24">
          <Reveal className="mb-12">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-text">
              Value
            </span>
          </Reveal>

          <ul className="flex flex-col">
            {valueItems.map((value, index) => (
              <Reveal as="li" key={value.number} delay={index * 0.06}>
                <div className="grid grid-cols-[auto_1fr] sm:grid-cols-[80px_1fr_1fr] gap-x-6 gap-y-2 items-baseline py-7 border-t border-line last:border-b">
                  <span className="text-sm font-semibold text-teal-text tabular-nums">
                    {value.number}
                  </span>
                  <p className="text-lg sm:text-xl font-semibold text-navy col-start-2 sm:col-start-2">
                    {value.title}
                  </p>
                  <p className="col-start-2 sm:col-start-3 text-sm sm:text-base text-ink-soft leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
