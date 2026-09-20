import Image from "next/image";
import { ClipboardList, IdCard, MessageCircle, Share2, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";

const APP_STORE_URL =
  "https://apps.apple.com/us/app/%E3%81%93%E3%81%9D%E3%81%A0%E3%81%A6%E3%83%90%E3%83%88%E3%83%B3/id6792291333";

const FEATURES = [
  { icon: IdCard, label: "子どもの情報カード" },
  { icon: ClipboardList, label: "持ち物チェックリスト" },
  { icon: MessageCircle, label: "聞きたいことメモ" },
  { icon: Share2, label: "家族への情報共有" },
];

export function KosodateBatonShowcase() {
  return (
    <Reveal className="mb-8 overflow-hidden rounded-lg border border-line bg-[linear-gradient(180deg,#fff6ee_0%,#ffffff_55%)]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-6 items-center px-6 sm:px-10 lg:px-12 py-12 sm:py-16">
        <div className="order-2 lg:order-1 flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-[0.2em] uppercase text-teal-text">
            App
          </span>

          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold text-navy">こそだてバトン</h3>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              ママが不在の「もしも」に、パパが迷わず対応できる育児情報共有アプリ。子どもの大切な情報を、家族でつなぎます。
            </p>
          </div>

          <ul className="flex flex-col gap-3 border-t border-line pt-5">
            {FEATURES.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 text-sm text-ink">
                <Icon aria-hidden="true" size={18} strokeWidth={1.6} className="shrink-0 text-teal" />
                {label}
              </li>
            ))}
          </ul>

          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noreferrer noopener"
            className="group inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-navy transition-colors hover:text-teal-text"
          >
            App Storeで見る
            <ArrowUpRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>

        <div className="order-1 lg:order-2 relative mx-auto h-[340px] w-full max-w-sm sm:h-[400px] sm:max-w-md lg:h-[440px]">
          <div className="absolute left-0 top-6 z-0 aspect-[700/1514] w-[34%] drop-shadow-md">
            <Image
              src="/images/works/kosodate-baton/memo.webp"
              alt="こそだてバトンの「聞きたいことメモ」画面。担任の先生や病院の先生への質問を記録できる"
              fill
              sizes="(min-width: 1024px) 160px, 130px"
              className="object-contain"
            />
          </div>

          <div className="absolute right-0 top-6 z-0 aspect-[700/1514] w-[34%] drop-shadow-md">
            <Image
              src="/images/works/kosodate-baton/share.webp"
              alt="こそだてバトンの「共有」画面。登録情報をパスコード付きで家族と共有できる"
              fill
              sizes="(min-width: 1024px) 160px, 130px"
              className="object-contain"
            />
          </div>

          <div className="absolute left-1/2 top-0 z-10 aspect-[700/1514] w-[46%] -translate-x-1/2 drop-shadow-xl">
            <Image
              src="/images/works/kosodate-baton/info-card.webp"
              alt="こそだてバトンの「子どもの情報カード」画面。子どもの名前・生年月日・身長体重が表示されている"
              fill
              sizes="(min-width: 1024px) 220px, 180px"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </Reveal>
  );
}
