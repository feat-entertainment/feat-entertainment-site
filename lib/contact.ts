export type ContactFormData = {
  name: string;
  email: string;
  company: string;
  inquiryType: string;
  message: string;
};

export type ContactSubmitResult = {
  ok: boolean;
};

/**
 * 現状はモック送信。実際の送信先(Formspree / Resend / 自前API等)が決まったら
 * この関数の中身だけを差し替えれば、フォーム側の実装には手を入れなくてよい。
 */
export async function submitContactForm(
  data: ContactFormData,
): Promise<ContactSubmitResult> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  console.info("[contact:mock-submit]", data);
  return { ok: true };
}
