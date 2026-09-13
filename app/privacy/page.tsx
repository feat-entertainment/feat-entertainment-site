import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
  description: `${siteConfig.name}のプライバシーポリシーです。`,
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    heading: "個人情報の取得について",
    body: "当社は、お問い合わせフォームを通じて、お名前・メールアドレス・会社名・お問い合わせ内容などの個人情報を取得する場合があります。",
  },
  {
    heading: "利用目的",
    body: "取得した個人情報は、お問い合わせへの回答、ご依頼・ご相談への対応、その他付随する業務のために利用し、目的の範囲を超えて利用することはありません。",
  },
  {
    heading: "第三者提供について",
    body: "法令に基づく場合を除き、ご本人の同意なく個人情報を第三者に提供することはありません。",
  },
  {
    heading: "個人情報の管理",
    body: "取得した個人情報は適切に管理し、漏えい・滅失・毀損の防止に努めます。",
  },
  {
    heading: "開示・訂正・削除について",
    body: "ご本人からの個人情報の開示・訂正・削除等のご依頼には、本人確認の上、合理的な範囲で速やかに対応します。",
  },
  {
    heading: "お問い合わせ窓口",
    body: `本ポリシーに関するお問い合わせは、${siteConfig.contactEmail} までご連絡ください。`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <Container>
          <h1 className="text-3xl sm:text-4xl font-semibold text-navy">
            プライバシーポリシー
          </h1>
          <p className="mt-4 text-sm text-ink-soft">
            {siteConfig.name}(以下「当社」といいます)は、以下のとおりプライバシーポリシーを定めます。
          </p>

          <div className="mt-14 flex max-w-2xl flex-col gap-10">
            {sections.map((section) => (
              <div key={section.heading}>
                <h2 className="text-lg font-semibold text-navy">{section.heading}</h2>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-ink-soft">
                  {section.body}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-16 text-xs text-ink-soft">制定日:2026年9月13日</p>
        </Container>
      </main>
      <Footer />
    </>
  );
}
