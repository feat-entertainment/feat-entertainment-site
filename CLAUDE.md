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

- `brand/feat.Entertainment-Logo-v2.ai` … 現行ロゴの原本(Illustrator、PDF互換)。案1〜3のロゴ案・アプリアイコン案が1ページにまとまったコンプシート。**採用しているのは「案3」**(2026-09-15、ユーザー指定)。
- `brand/feat.Entertainment-Logo-v2-reference.pdf` … 上記の見た目確認用の書き出し(低解像度)。
- `brand/extract_logo.py` … `.ai`から案3部分を切り出し、サイトのNavy/Teal(下記)に再配色して `public/images/logo-*.png` ・ `app/icon.png` / `app/apple-icon.png` ・ `public/og-image.png` を生成するPythonスクリプト(`pip install pymupdf pillow numpy`)。**注意**: スクリプト内のクロップ座標はこのコンプシートのレイアウトに固定値で合わせてあるため、`.ai`のレイアウトが変わったら座標を測り直す必要がある。
- ブランドカラー: Navy `#0a2342` / Teal `#0f9eae`(`app/globals.css` の `@theme` で定義)。**注意**: `.ai`ファイル自体のカラースウォッチ表記はNavy `#002063` / Teal `#08979c` とやや異なるが、サイトは既存配色を維持する方針(2026-09-15確認済み)。ロゴ画像はこのサイト配色に合わせて再配色して書き出している。

## 未実装・仮実装

- お問い合わせフォームの送信は現状モック(`lib/contact.ts`)。実送信先は未接続。
- 会社概要の代表者名・所在地・設立年は未入力(`data/company.ts`)。
