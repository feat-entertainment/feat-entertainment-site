# ビジュアルリニューアル計画(2026-09-20〜)

対象: `E:\Claude\apps\feat-entertainment-site`。作業ブランチ `visual-refresh`(バックアップ: `master` は `pre-visual-refresh` タグで固定)。

## 目的

現在のミニマルなデザイン(白い余白・ネイビー/ターコイズ・細いライン・タイポグラフィ中心)を維持しながら、提供された3枚の写真と実際の「こそだてバトン」アプリ画面を使い、「人の暮らし」「創造」「技術」「未来」が感じられるサイトへビジュアルを更新する。写真を大量に並べるのではなく、ブランドメッセージを補完するポイントとして配置する。

## ブランドコンセプト(参照)

- Mission: 「暮らしを少し、もっと豊かにする。」
- Vision: 「関わるすべての人が、昨日より少し豊かになれる未来。」
- Brand Message: 「主役は、私たちではありません。」
- ストーリー: 人 → 創造・技術 → プロダクト → 暮らし → 未来(ロゴの ● → f → ● と連動)
- 避ける: 派手なグラデーション、過度なアニメーション、ネオン/サイバー表現、大量のカードUI、画面いっぱいの写真、写真上への大量の文字重ね
- 目指す印象: 誠実・温かい・静か・人間的・少し先進的

## 使用画像と役割(同じ画像でも用途ごとに役割・クロップを変える)

| 元ファイル | 用途 | クロップ/扱い |
|---|---|---|
| `about-life.png`(1672×941、既に16:9) | About セクション | ほぼそのまま16:9で使用。左上の風景から食卓+奥の家族が収まる範囲 |
| `business-entertainment.png`(1536×1024) | Business「01 Entertainment」 | 編集的な行レイアウト用に横長寄りでクロップ |
| `life-community.png`(1672×941) | Business「03 Life & Community」(インセット、狭め) | 家+庭が中心の近めクロップ。左上の白いアイコン状の写り込みは除外 |
| `life-community.png`(同上、別クロップ) | Philosophy セクション背景(フルブリード) | 横長・広めのクロップ。ネイビーの半透明オーバーレイを重ねる。左上のアイコン状の写り込みは除外 |

**注意**: `life-community.png` の左上に小さな白いアイコン状の写り込み(生成AIツールのウォーターマーク風)がある。全ての切り出しでこの角を除外する。

## ファイル構成

```
brand/
  photos/
    about-life.png                  # 原本コピー
    business-entertainment.png      # 原本コピー
    life-community.png              # 原本コピー
    kosodate-baton/
      06-info-card.png              # 「子どもの情報カード」画面(原本コピー)
      09-memo.png                   # 「聞きたいことメモ」画面(原本コピー)
      10-share.png                  # 「共有」画面(原本コピー)
  process_photos.py                 # クロップ/リサイズ/WebP変換スクリプト(brand/extract_logo_v3.pyと同じ作法)

public/images/
  photos/
    about-16x9.webp
    entertainment.webp
    life-inset.webp
    life-banner.webp
  works/kosodate-baton/
    info-card.webp
    memo.webp
    share.webp
```

元PNG(`E:\Claude\HomePage\Photo\`)は `brand/photos/` にコピーして原本として保持し、そこから最適化版(WebP)を生成する。既存ロゴパイプラインと同じ「brand/ = 原本、public/images/ = 生成物」の構成を踏襲する。

## セクション別の変更

### Hero
変更なし。

### About(`components/sections/AboutSection.tsx`)
- 見出しを他セクションと同じ上部フル幅の `SectionHeading`(eyebrow="About", title="共演者でありたい。")に統一。現状の左320px列レイアウトは廃止し、サイト全体の一貫性を上げる。
- その下、PC(`lg:`以上)で `text : photo ≒ 42 : 58` の非対称2カラムグリッド。本文(既存4段落、文言は変更しない)を左、写真を右。
- 写真: `about-life.png` を16:9で使用。角丸は小さく(`rounded-lg`程度)。文字は焼き込まない。`Reveal`でフェード+わずかなtranslateYのみ(拡大なし、または1.02→1程度のごく軽いscale)。
- alt: 「家族が穏やかな時間を過ごすリビング」
- モバイル: 見出し→本文→写真の順で自然に縦積み。

### Business(`components/sections/BusinessSection.tsx`, `data/business.ts`)
- 現状の「3枚並列カード」グリッドをやめ、Valueセクションと同じ「細い罫線(`border-line`)区切りの縦積みリスト」構成に変更。カードUIを避け、既存デザイン言語(Value)を流用する。
- 各行: 大きめの薄い連番(01/02/03)+タイトル+説明+Now/Nextタグ(既存の`threads`表示は維持)。
- **01 Entertainment**: `business-entertainment.png` を使用。テキストと写真を左右に配置(行ごとに左右を交互にして編集誌面らしいリズムを作る)。
  - alt: 「ゲーム・音楽・映像制作を行うクリエイティブワークスペース」
- **02 Technology**: 写真は使わない。既存のアイコン(Cpu)・細線・タイポグラフィを活かす。ロゴのモチーフ(● → f → ●)を意識した控えめな線画装飾を検討(過度な装飾にはしない)。
- **03 Life & Community**: `life-community.png` の近めクロップ(インセット)を使用。テキストは「将来の事業領域・挑戦」として自然に読める内容に微調整(現状の`description`が「不動産や空き家問題など、暮らしと社会を支える領域です」で概ね問題ないが、大規模展開中と誤読されないよう文言を最終確認する)。
  - alt: 「夕暮れの日本の住まい」

### Works(`components/sections/WorksSection.tsx`, `data/works.ts`)
- `workItems` から `kosodate-baton` を除外した残り(`game-guide-sites` 等)は現状通りの簡易カードで描画。
- `kosodate-baton` のみ専用の編集的ブロック(新規コンポーネント、例 `components/sections/works/KosodateBatonShowcase.tsx`)として、簡易カードの上に配置:
  - 左: カテゴリラベル、タイトル「こそだてバトン」、説明文(現状の文言 or ブリーフ案のどちらか良い方を採用)、機能リスト(子どもの情報カード/持ち物チェックリスト/聞きたいことメモ/家族への情報共有)、CTA「App Storeで見る →」
    - リンク先: `https://apps.apple.com/us/app/%E3%81%93%E3%81%9D%E3%81%A0%E3%81%A6%E3%83%90%E3%83%88%E3%83%B3/id6792291333`
    - `target="_blank" rel="noreferrer noopener"`
  - 右: 実機スクリーンショット3枚(中央=情報カード[06]を最大、左奥=聞きたいことメモ[09]、右奥=共有[10])。軽いオフセット配置(Apple公式サイト程度のシンプルさ)。回転・過度な3Dは使わない。
  - スクリーンショット自体の加工・生成・改変は一切行わない(そのままWebP変換のみ)。
  - alt: 各画面の内容に即した具体的な文言(例: 「こそだてバトンの『子どもの情報カード』画面。子どもの名前・生年月日・身長体重が表示されている」)。
  - 背景: 白 or 非常に薄い暖色系。アプリ固有のオレンジ/ブルーはアクセントとして残しつつ、サイト全体のネイビー/ターコイズとのバランスを崩さない。

### Philosophy(`components/sections/PhilosophySection.tsx`)
- `life-community.png` の別クロップ(横長フルブリード)を `absolute inset-0 object-cover` で背景に配置し、ネイビーの半透明〜グラデーションオーバーレイ(例: `rgba(10,35,66,.9)→rgba(10,35,66,.75)`)を重ねる。
- 既存のテキスト内容・アニメーションは変更しない。可読性(コントラスト比)を確認する。
- 背景画像の alt は空(装飾目的、`alt=""`)。Businessでの使用とはクロップ・役割を変える(繰り返し感を出さない)。

## パフォーマンス方針

このプロジェクトは `next.config.ts` で `output: "export"` + `images: { unoptimized: true }` のため、`next/image` の自動リサイズ/srcset生成は効かない(静的ホスティングの制約)。そのため:

- `brand/process_photos.py` で各用途に適したサイズのWebPを事前生成する(quality ≈ 80、幅は用途に応じて800〜1800px程度)。
- 引き続き `next/image` を使用し、明示的な `width`/`height`(またはaspect-ratio)でCLSを防止し、`loading="lazy"`(デフォルト、Hero関連以外)を活用する。
- 真のブレークポイント別レスポンシブ画像(`<picture>` + 複数解像度のsrcSet)は静的エクスポートの制約上、今回のスコープでは行わない。今後の改善点として報告書に明記する。
- 元PNGは `brand/photos/` に保持し、削除しない。

## アニメーション方針

既存の `Reveal`(fade + 16px translateY)をそのまま流用する。写真には必要に応じてごく軽いscale(1.02→1程度)を追加してもよいが、目立つズーム・回転・パララックスは行わない。`prefers-reduced-motion` は既存のグローバル対応(`globals.css`)でカバーされる。

## SEO / Accessibility

- 各画像に上記の具体的なaltを設定(装飾目的の背景画像のみ空alt)。
- 見出し階層(h1→h2→h3)を崩さない。`SectionHeading`はh2、Business各行・Works各アイテムのタイトルはh3のまま。

## 変更ファイル一覧(見込み)

- `components/sections/AboutSection.tsx`
- `components/sections/BusinessSection.tsx`
- `components/sections/WorksSection.tsx`
- `components/sections/PhilosophySection.tsx`
- `components/sections/works/KosodateBatonShowcase.tsx`(新規)
- `data/business.ts`(Life & Community の文言を必要なら微調整)
- `data/works.ts`(必要なら型拡張 or kosodate-baton専用データを分離)
- `brand/process_photos.py`(新規)
- `brand/photos/**`(新規、原本コピー)
- `public/images/photos/*.webp`、`public/images/works/kosodate-baton/*.webp`(新規)

## 実装後チェックリスト

1. `npm run lint`
2. `npm run build`(TypeScriptチェック含む)
3. Playwrightでdevサーバーを開き、Desktop/Mobile双方のスクリーンショットを確認
4. 画像切れ・alt・App Storeリンクのtarget/rel確認
5. コンソールエラー確認
6. 既存機能(nav・フォーム・Privacy Policyページ等)が壊れていないことを確認
