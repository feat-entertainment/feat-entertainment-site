import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
};

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "dark",
}: SectionHeadingProps) {
  const alignClass = align === "center" ? "items-center text-center" : "items-start text-left";
  const eyebrowColor = tone === "dark" ? "text-teal-text" : "text-teal-light";
  const titleColor = tone === "dark" ? "text-navy" : "text-white";
  const leadColor = tone === "dark" ? "text-ink-soft" : "text-white/70";

  return (
    <Reveal className={`flex flex-col gap-4 ${alignClass}`}>
      <span
        className={`text-xs font-semibold tracking-[0.2em] uppercase ${eyebrowColor}`}
      >
        {eyebrow}
      </span>
      <h2 className={`text-3xl sm:text-4xl font-semibold leading-snug ${titleColor}`}>
        {title}
      </h2>
      {lead ? (
        <p className={`max-w-xl text-base sm:text-lg leading-relaxed ${leadColor}`}>
          {lead}
        </p>
      ) : null}
    </Reveal>
  );
}
