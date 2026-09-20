import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white scroll-mt-20">
      <Container>
        <SectionHeading eyebrow="About" title="共演者でありたい。" />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[minmax(0,42%)_1fr] gap-12 lg:gap-16 items-center">
          <Reveal delay={0.1} className="flex flex-col gap-6">
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

          <Reveal delay={0.2}>
            <div className="relative aspect-video w-full overflow-hidden rounded-lg">
              <Image
                src="/images/photos/about-16x9.webp"
                alt="家族が穏やかな時間を過ごすリビング"
                fill
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
