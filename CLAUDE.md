@AGENTS.md

# feat-entertainment-site

feat.Entertainment合同会社のコーポレートサイト。Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide Icons。`output: "export"` で静的書き出しし、GitHub Pages(独自ドメイン `feat-entertainment.com`、`public/CNAME`)で配信する。

## デプロイ

`master` へのpushで `.github/workflows/deploy.yml` が `next build` → `out/` をGitHub Pagesに自動デプロイする。**初回のみ**、GitHubリポジトリの Settings → Pages → Source を「GitHub Actions」に切り替える手動作業が必要(ブラウザでの1回だけの設定)。

## 編集しやすいデータ置き場

- `data/values.ts` … Value(5項目)
- `data/business.ts` … 事業領域とNow/Nextラベル
- `data/works.ts` … 実績カード(配列に追加するだけで増える)
- `data/company.ts` … 会社概要(住所・代表者などは空文字なら自動で「—」表示になり、埋まったら書き換えるだけでよい)
- `data/inquiry-types.ts` … お問い合わせ種別のセレクト選択肢
- `lib/site.ts` … サイト名・説明文・問い合わせ先メールなどのサイト全体設定
- `lib/contact.ts` … `submitContactForm()` が現状モック送信。Formspree/Resend/自前API等に繋ぐ際はこの関数の中身だけ差し替える。

## ロゴ・ブランド素材

- `brand/feat.Entertainment-Logo-source.png` … 元ロゴ(未加工)。編集不可・改変禁止の原本。
- `brand/process_logo.py`, `brand/make_favicons_og.py` … 元ロゴから `public/images/logo-*.png` ・ `app/icon.png` / `app/apple-icon.png` ・ `public/og-image.png` を生成したPythonスクリプト(Pillow使用)。ロゴを差し替える際はソース画像を置き換えて再実行する。
- ロゴ抽出カラー: Navy `#0a2342` / Teal `#0f9eae`(`app/globals.css` の `@theme` で定義)。

## 未実装・仮実装

- お問い合わせフォームの送信は現状モック(`lib/contact.ts`)。実送信先は未接続。
- 会社概要の代表者名・所在地・設立年は未入力(`data/company.ts`)。
