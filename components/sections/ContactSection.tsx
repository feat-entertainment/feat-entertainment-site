"use client";

import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { inquiryTypes } from "@/data/inquiry-types";
import { submitContactForm } from "@/lib/contact";
import { siteConfig } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const inputClass =
  "w-full rounded-md border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/60 focus-visible:outline-2 focus-visible:outline-teal focus-visible:outline-offset-2";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");
    try {
      const result = await submitContactForm({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        company: String(formData.get("company") ?? ""),
        inquiryType: String(formData.get("inquiryType") ?? ""),
        message: String(formData.get("message") ?? ""),
      });
      setStatus(result.ok ? "success" : "error");
      if (result.ok) {
        form.reset();
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-mist scroll-mt-20">
      <Container>
        <SectionHeading
          eyebrow="Contact"
          title="一緒に、少し豊かな未来を。"
          lead={
            <>
              ご相談・ご依頼はこちらのフォーム、または
              <a
                href={`mailto:${siteConfig.contactEmail}`}
                className="text-teal-text underline underline-offset-4 hover:text-navy"
              >
                {siteConfig.contactEmail}
              </a>
              まで直接ご連絡ください。
            </>
          }
        />

        <Reveal delay={0.1} className="mt-14 max-w-2xl">
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-sm font-medium text-navy">
                  お名前<span className="text-teal-text"> *</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  autoComplete="name"
                  className={inputClass}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-navy">
                  メールアドレス<span className="text-teal-text"> *</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="company-name" className="text-sm font-medium text-navy">
                会社名<span className="text-ink-soft font-normal"> 任意</span>
              </label>
              <input
                id="company-name"
                name="company"
                type="text"
                autoComplete="organization"
                className={inputClass}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="inquiryType" className="text-sm font-medium text-navy">
                お問い合わせ種別<span className="text-teal-text"> *</span>
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                required
                defaultValue=""
                className={inputClass}
              >
                <option value="" disabled>
                  選択してください
                </option>
                {inquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-sm font-medium text-navy">
                内容<span className="text-teal-text"> *</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={6}
                className={inputClass}
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={status === "submitting"}
                className="inline-flex items-center justify-center rounded-md bg-navy px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-dark disabled:opacity-60"
              >
                {status === "submitting" ? "送信中..." : "送信する"}
              </button>

              <p aria-live="polite" className="text-sm">
                {status === "success" ? (
                  <span className="text-teal-text">
                    送信ありがとうございました。追ってご連絡いたします。
                  </span>
                ) : null}
                {status === "error" ? (
                  <span className="text-red-600">
                    送信に失敗しました。お手数ですがメールでご連絡ください。
                  </span>
                ) : null}
              </p>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
