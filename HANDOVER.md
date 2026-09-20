# 引継書 — feat-entertainment-site リニューアル(2026-09-13〜09-20)

対象: `E:\Claude\apps\feat-entertainment-site`(feat.Entertainment合同会社のコーポレートサイト)

## 1. 何をしたか(概要)

こそだてバトンのリンクだけ載せた簡易HTML1枚のサイトを、ブランドコンセプト「主役は、私たちではありません。」を軸にしたフルのコーポレートサイトへリニューアルした。Next.js(App Router)で1から実装し、GitHub Pagesで独自ドメイン運用のまま公開している。

- 本番URL: https://feat-entertainment.com
- リポジトリ: https://github.com/feat-entertainment/feat-entertainment-site (Private)
- 常時ルール・データ編集箇所は `CLAUDE.md` にまとめてある。**作業前に必ず読むこと。**

## 2. 技術構成

| 項目 | 内容 |
|---|---|
| フレームワーク | Next.js 16(App Router)、`output: "export"` で静的書き出し |
| 言語/スタイル | TypeScript(strict) / Tailwind CSS v4 |
| アニメーション | Framer Motion(Hero のロゴワイプイン、各セクションのフェードイン) |
| アイコン | Lucide Icons |
| デプロイ | GitHub Actions(`.github/workflows/deploy.yml`)→ GitHub Pages。Pages の Source は「GitHub Actions」設定済み(legacy branch方式ではない) |
| ドメイン | `feat-entertainment.com`(`public/CNAME`) |

`master` へ push すると自動でビルド・デプロイされる。**手動で触る必要は基本ない。**

## 3. 経緯(時系列サマリ)

1. **サイト全体を新規実装**(2026-09-13)。ユーザーが渡した詳細なブランドブリーフ(ロゴ画像・Mission/Vision/Value・事業領域・デザインキーワード等)を元に、Hero〜About〜Mission/Value〜Business〜Works〜Philosophy(紺全面)〜Company〜Contact〜Footer の1ページ構成を設計・実装。SEO(OGP/構造化データ/sitemap/robots)、アクセシビリティ、レスポンシブ対応も一式実施。
2. **GitHub Pages配信の構築**。GitHub Actionsワークフローを新規作成し、Pages Source をブラウザ操作でActions方式に切替え。**この際、`gh api PUT .../pages` で `build_type` だけ指定したら `cname` が消えてサイトが404になった**(PUTはフルリプレースのため)。`cname` を明示的に再設定して復旧。
3. **ロゴを「案3」に差し替え**(2026-09-15)。ユーザーが `.ai`(PDF互換)ファイルで3案のロゴ・アプリアイコンをまとめたコンプシートを提供 → 「案3」を指定。PyMuPDFで高解像度ラスタ化し、座標抽出・再配色するPythonスクリプトを作成(`brand/extract_logo.py`、当時)。**このときは「サイトの既存配色(Navy #0a2342 / Teal #0f9eae)を維持し、ロゴもそれに合わせて再配色する」方針**で実施。
4. **フッターのロゴが横に潰れて表示されるバグを修正**。原因は `flex flex-col` コンテナに `items-start` が無く、デフォルトの `align-items: stretch` でロゴ画像の幅が引き伸ばされていたこと(ヘッダー側は `items-center` があったため無事だった)。**同種のバグが他にないか、新しくコンポーネントを追加する際は要注意。**
5. **Worksにこそだてバトンを追加、Business の「アプリ開発」を Now に変更**(2026-09-15)。papa-tsuin-appが既にリリース済みのため。
6. **会社概要から代表者・所在地・設立年を一旦削除**(2026-09-15、ユーザー指示)。`data/company.ts` から行ごと削除。情報確定後に行を追加すれば復活する構造。ついでに `id="company"` がCompanyセクションとお問い合わせフォームの「会社名」欄で重複していたバグ(HTML的に無効、label紐付けが不正確)を発見・修正。
7. **問い合わせメールアドレスを変更**(2026-09-20): `feat.entertainment.llc@gmail.com` → `info@feat-entertainment.com`。`lib/site.ts` の1箇所を直せば全ページに伝播する構造。
8. **ロゴを再度差し替え**(2026-09-20)。ユーザーが今度は**ネイティブSVG**(`feat.Entertainment-Logo-v3.svg`、Illustratorのクリップパス書き出し)を提供。「デザインと色をそのまま使って」という指示だったため、**適用範囲(ロゴ画像だけか、サイトUI全体の配色トークンまでか)を確認**したところ「ロゴ画像のみこのSVGの色(近似黒 #231f20 のインク・Teal #08979d)で作り直し、サイトUIの色(ボタン・見出し等)は現状維持」という回答。Playwrightでこの SVG を高解像度ラスタ化 → Pythonで切り出し・再配色するパイプライン(`brand/render_svg.mjs` → `brand/extract_logo_v3.py`)を新規作成。
9. **faviconもこのSVGのアプリアイコンパネルに変更**(同日、追加指示)。このSVGには紺塗り背景版のアプリアイコンが無く、**白背景+濃色アウトラインの角丸アイコンに変わった**(旧: 紺塗り四角)。

## 4. 現在の状態

### 実装済み
- 全セクション(Hero〜Contact〜Footer)、Privacy Policyページ
- ロゴのワイプインアニメーション(初回のみ・控えめ、`prefers-reduced-motion`対応)
- お問い合わせフォーム(UIのみ、送信は後述の通りモック)
- SEO一式(metadata, OGP, Twitter Card, JSON-LD Organization, sitemap.xml, robots.txt)
- レスポンシブ(375px〜デスクトップで確認済み)

### 未実装・仮実装(要フォローアップ)
- **お問い合わせフォームの送信処理はモック**(`lib/contact.ts` の `submitContactForm()`)。console.info するだけで実際には送信されない。Formspree/Resend/自前APIなど決まり次第、この関数の中身だけ差し替えれば良い構造にしてある。
- **会社概要の代表者名・所在地・設立年が非表示**。情報が確定したら `data/company.ts` の `companyRows` に行を追加するだけで表示される(空文字なら自動で「—」表示になる設計)。

## 5. ロゴ・ブランド素材の扱い方(重要)

現行ロゴの原本は **`brand/feat.Entertainment-Logo-v3.svg`**(2026-09-20版)。再生成する場合:

```bash
# 1) SVGを高解像度ラスタに書き出し(要 playwright)
cd feat-entertainment-site
npm install --no-save playwright && npx playwright install chromium
node brand/render_svg.mjs

# 2) 切り出し・再配色・書き出し(要 pillow, numpy)
pip install pillow numpy
python brand/extract_logo_v3.py
```

これで `public/images/logo-*.png`・`public/og-image.png`・`app/icon.png`・`app/apple-icon.png` が再生成される。

**注意点**:
- スクリプト内のクロップ座標(`WORDMARK_BOX` / `TEXT_GAP_Y` / `APP_ICON_BOX`)はこのSVG固有のレイアウトに合わせた固定値。**ロゴを再度差し替える場合は座標を測り直す必要がある**(座標の測り方は `brand/extract_logo_v3.py` のコメント・過去のコミットログ参照)。
- **ロゴ画像自体の色(インク近似黒・Teal)と、サイトUI全体の配色トークン(Navy #0a2342 / Teal #0f9eae、`app/globals.css`)は意図的に別管理**。今後また新しいロゴ/カラー素材を受け取ったら、「ロゴ画像だけの変更か」「サイトUI全体の配色変更まで含むか」を毎回確認すること(過去2回、この点が曖昧で確認が必要だった)。
- 一つ前(2026-09-15版)のロゴ原本一式(`brand/feat.Entertainment-Logo-v2.ai` 等)は現在不使用だが参考として残置してある。

## 6. 運用上の注意点(ハマりどころ)

1. **GitHub Pages の設定をAPIで変更する時**: `gh api -X PUT repos/{owner}/{repo}/pages` は一部フィールドだけ渡すとフルリプレースになり、`cname` 等の他フィールドが消える。変更前に必ず現在の設定を確認し、変更後も再確認すること。
2. **`flex flex-col` コンテナ**: デフォルトで `align-items: stretch` になり、中の画像等が意図せず引き伸ばされる。子要素の幅を intrinsic のままにしたい場合は `items-start` を忘れずに。
3. **ローカルdevサーバー起動時のポート衝突**: このPCのポート3000には本プロジェクトと無関係な別プロセスが常駐していることがある。`npm run dev -- -p <別のポート>` で回避するのが安全。
4. コミット前は必ず `npm run lint` と `npm run build` を実行し、0エラーを確認してから提案すること(このセッションでは毎回実施)。

## 7. 今後の検討事項(ユーザーへの確認待ち)

- お問い合わせフォームの実送信先(Formspree / Resend / 自前API等)
- 会社概要: 代表者名・所在地・設立年
- Works: 今後アプリ・AIサービス・音楽・映像等の実績が増えたら `data/works.ts` に追加

---
*このドキュメントは2026-09-20時点のスナップショット。以降の変更はコミットログと `CLAUDE.md` を正とする。*
