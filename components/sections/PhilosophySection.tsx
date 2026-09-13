import { Reveal } from "@/components/ui/Reveal";
import { Container } from "@/components/ui/Container";

export function PhilosophySection() {
  return (
    <section className="relative bg-navy py-28 sm:py-40 overflow-hidden">
      <Container>
        <div className="flex flex-col items-center gap-10 text-center">
          <Reveal>
            <span
              aria-hidden="true"
              className="mx-auto mb-8 block h-3 w-3 rounded-full bg-teal"
            />
            <h2 className="max-w-3xl text-3xl sm:text-5xl font-semibold leading-snug text-white">
              主役は、私たちではありません。
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="max-w-xl text-base sm:text-lg leading-loose text-white/70">
              ゲームをつくるときも。
              <br />
              AIをつくるときも。
              <br />
              新しいサービスを考えるときも。
              <br />
              その先にいる人を、いちばん大切にする会社でありたい。
            </p>
          </Reveal>

          <Reveal delay={0.3}>
            <p className="mt-4 text-xl sm:text-2xl font-medium text-teal-light">
              暮らしを少し、もっと豊かに。
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
