import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { companyRows } from "@/data/company";

export function CompanySection() {
  return (
    <section id="company" className="py-24 sm:py-32 bg-white scroll-mt-20">
      <Container>
        <SectionHeading eyebrow="Company" title="会社概要" />

        <Reveal delay={0.1} className="mt-14 max-w-3xl">
          <dl className="flex flex-col">
            {companyRows.map((row) => {
              const isEmpty = Array.isArray(row.value)
                ? row.value.length === 0
                : row.value.trim() === "";

              return (
                <div
                  key={row.label}
                  className="grid grid-cols-1 sm:grid-cols-[140px_1fr] gap-1 sm:gap-6 border-t border-line py-5 last:border-b"
                >
                  <dt className="text-sm font-semibold text-ink-soft">{row.label}</dt>
                  <dd className="text-sm sm:text-base text-ink">
                    {isEmpty ? (
                      <span className="text-ink-soft">—</span>
                    ) : Array.isArray(row.value) ? (
                      <ul className="flex flex-col gap-1">
                        {row.value.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    ) : (
                      row.value
                    )}
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      </Container>
    </section>
  );
}
