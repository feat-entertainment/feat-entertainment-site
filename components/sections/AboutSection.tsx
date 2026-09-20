import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white scroll-mt-20">
      <Container>
        <div className="relative min-h-[340px] sm:min-h-[420px] overflow-hidden rounded-lg">
          <Image
            src="/images/photos/about-16x9.webp"
            alt="家族が穏やかな時間を過ごすリビング"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-t from-navy/85 via-navy/35 to-navy/10"
          />
          <div className="relative z-10 flex h-full flex-col justify-end p-8 sm:p-12">
            <SectionHeading eyebrow="About" title="共演者でありたい。" tone="light" />
          </div>
        </div>

        <Reveal delay={0.15} className="mt-12 flex flex-col gap-6 max-w-2xl">
          <p className="text-base sm:text-lg leading-loose text-ink-soft">
            音楽で使われる「feat.」は、誰かと共演することを意味します。
          </p>
          <p className="text-base sm:text-lg leading-loose text-ink-soft">
            私たちは、ゲームでも、AIでも、音楽でも、映像でも、その先にいる「人」を主役に考えます。技術そのものが目的ではありません。
          </p>
          <p className="text-base sm:text-lg leading-loose text-ink-soft">
            私たちは、誰かの日常が少し便利になること、少し楽しくなること、少し安心できることを大切にしています。
          </p>
          <p className="text-base sm:text-lg leading-loose text-navy font-medium">
            大きく世界を変えるのではなく、一人ひとりの毎日を少しずつ良くしていく。それが、feat.Entertainmentのものづくりです。
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
