"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-white pt-32 pb-20 sm:pt-40 sm:pb-28"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8 lg:px-10">
        <div className="flex flex-col items-start gap-10">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="text-sm font-semibold tracking-[0.2em] text-teal-text uppercase"
          >
            feat.Entertainment合同会社
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE }}
            className="max-w-3xl text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.3] text-navy"
          >
            主役は、
            <br className="sm:hidden" />
            私たちではありません。
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22, ease: EASE }}
            className="max-w-xl text-lg sm:text-xl leading-relaxed text-ink-soft"
          >
            私たちは、あなたの毎日を少しだけ豊かにする共演者です。
          </motion.p>

          <div className="w-full max-w-2xl py-4 sm:py-6">
            <div
              className="relative w-full overflow-hidden"
              style={{ aspectRatio: "900 / 311" }}
            >
              <Image
                src="/images/logo-mark-navy.png"
                alt="feat.Entertainment ロゴマーク:人を表す紺色の丸から、共演者を意味するfへ、そして少し豊かになった未来を表すターコイズの丸へと続く一本の線"
                fill
                priority
                sizes="(min-width: 640px) 640px, 100vw"
                className="object-contain object-left"
              />
              {!reduceMotion ? (
                <motion.div
                  className="absolute inset-0 bg-white"
                  initial={{ clipPath: "inset(0 0 0 0)" }}
                  animate={{ clipPath: "inset(0 0 0 100%)" }}
                  transition={{ duration: 1.7, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
                />
              ) : null}
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
            className="text-2xl sm:text-3xl font-medium text-navy"
          >
            暮らしを少し、もっと豊かに。
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
            className="flex flex-wrap gap-4 pt-2"
          >
            <Link
              href="#about"
              className="inline-flex items-center justify-center rounded-md bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark"
            >
              私たちについて
            </Link>
            <Link
              href="#business"
              className="inline-flex items-center justify-center rounded-md border border-navy/20 px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/40 hover:bg-mist"
            >
              事業を見る
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
