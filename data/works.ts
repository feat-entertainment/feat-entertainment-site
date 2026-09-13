export type WorkItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  href?: string;
};

/**
 * 実績カード。増やす場合はこの配列に追加するだけでよい構造。
 */
export const workItems: WorkItem[] = [
  {
    id: "game-guide-sites",
    category: "Game",
    title: "ゲームアプリ攻略サイト運営",
    description:
      "マージ系ゲームを中心に、遊ぶ人の「ちょっと分からない」に寄り添う攻略情報を発信しています。",
  },
];
