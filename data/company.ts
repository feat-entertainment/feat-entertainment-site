export type CompanyRow = {
  label: string;
  value: string | string[];
};

/**
 * 会社概要。住所・代表者名など未確定の項目は空文字のままにしておけば
 * 「—」表示になりレイアウトは崩れない。判明した時点でここを編集する。
 */
export const companyRows: CompanyRow[] = [
  { label: "会社名", value: "feat.Entertainment合同会社" },
  { label: "英文社名", value: "feat.Entertainment LLC" },
  { label: "法人形態", value: "合同会社" },
  {
    label: "事業内容",
    value: [
      "Webメディア運営",
      "デジタルコンテンツ企画・制作",
      "アプリケーション / Webサービス企画・開発",
      "その他、暮らしを豊かにする事業",
    ],
  },
  { label: "代表者", value: "" },
  { label: "所在地", value: "" },
  { label: "設立", value: "" },
];
