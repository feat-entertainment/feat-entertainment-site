import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-white scroll-mt-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,320px)_1fr] gap-12 lg:gap-20">
          <SectionHeading eyebrow="About" title="共演者でありたい。" />

          <Reveal delay={0.1} className="flex flex-col gap-6 max-w-2xl">
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
        </div>
      </Container>
    </section>
  );
}
