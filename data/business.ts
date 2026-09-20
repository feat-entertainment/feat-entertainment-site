export type BusinessStatus = "now" | "next";

export type BusinessThread = {
  label: string;
  status: BusinessStatus;
};

export type BusinessDomain = {
  id: string;
  title: string;
  titleJa: string;
  description: string;
  threads: BusinessThread[];
};

export const businessDomains: BusinessDomain[] = [
  {
    id: "entertainment",
    title: "Entertainment",
    titleJa: "ゲーム / 音楽 / 映像",
    description:
      "遊びや物語を通じて、日常にちょっとした彩りを届ける領域です。",
    threads: [
      { label: "ゲーム攻略サイト運営", status: "now" },
      { label: "音楽", status: "next" },
      { label: "映像", status: "next" },
    ],
  },
  {
    id: "technology",
    title: "Technology",
    titleJa: "AI / アプリ / Webサービス",
    description:
      "技術そのものではなく、技術が生む「少しの便利」を届ける領域です。",
    threads: [
      { label: "AIを活用したサービス", status: "next" },
      { label: "アプリ開発", status: "now" },
      { label: "Webサービス", status: "next" },
    ],
  },
  {
    id: "life",
    title: "Life & Community",
    titleJa: "暮らし / 不動産 / 地域課題",
    description:
      "住まい、地域、空き家活用など、暮らしの土台を支える領域として、これから挑戦していきたいと考えています。",
    threads: [
      { label: "暮らしを支えるサービス", status: "next" },
      { label: "不動産", status: "next" },
      { label: "空き家・地域課題", status: "next" },
    ],
  },
];
