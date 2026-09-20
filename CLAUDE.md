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

- **現行ロゴ画像の元データ**: `brand/feat.Entertainment-Logo-v3.svg`(2026-09-20にユーザー提供、ネイティブベクター)。`public/images/logo-*.png` ・ `public/og-image.png` ・ `app/icon.png` / `app/apple-icon.png` は全てこれが元になっている。
  - 生成手順: `node brand/render_svg.mjs`(SVGを高解像度ラスタに書き出し。要 `npm install --no-save playwright && npx playwright install chromium`)→ `python brand/extract_logo_v3.py`(切り出し・書き出し。要 `pip install pillow numpy`)。
  - **色はこのSVGの原色をそのまま使用**(インク Near-black `#231f20` / アクセント Teal `#08979d` 付近。2026-09-20にユーザー指示で「ロゴ画像のみ原色・サイトUIは現状維持」と明示決定)。Navy背景用の白版(`logo-*-white.png`)はこのSVGに存在しないため、インク色を白に置き換えて自前で派生させている。
  - favicon(`app/icon.png` / `app/apple-icon.png`)もこのSVGの白背景アプリアイコンパネルをそのまま使用(2026-09-20追加指示)。**旧版の紺塗り背景ではなく、白背景+濃色アウトラインの角丸アイコンに変わった**(このSVGに紺塗り版が無いため)。
  - **注意**: スクリプト内のクロップ座標(`WORDMARK_BOX` / `TEXT_GAP_Y` / `APP_ICON_BOX`)はこのSVG固有のレイアウトに合わせた固定値。ロゴを再度差し替える場合は座標を測り直す必要がある。
- `brand/feat.Entertainment-Logo-v2.ai` / `feat.Entertainment-Logo-v2-reference.pdf` / `extract_logo.py` … 一つ前(2026-09-15版)のロゴ原本一式(Illustrator、案1〜3のコンプシート)。現在は不使用だが参考として残置。
- サイトUIのブランドカラー: Navy `#0a2342` / Teal `#0f9eae`(`app/globals.css` の `@theme` で定義)。ボタン・見出し・Philosophyセクション背景などはこちらを使用し、ロゴ画像本体の色とは意図的に別管理。

## 未実装・仮実装

- お問い合わせフォームの送信は現状モック(`lib/contact.ts`)。実送信先は未接続。
- 会社概要の代表者名・所在地・設立年は2026-09-15にユーザー指示で一旦非表示(`data/company.ts`から行ごと削除)。情報が確定したら`companyRows`に行を追加すれば表示される。
