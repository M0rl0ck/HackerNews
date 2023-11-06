interface INews {
  by: string;
  descendants: number;
  id: number;
  kids?: number[];
  score: number;
  time: number;
  title: string;
  type: "story";
  url: string;
}

interface IComment {
  by: string;
  id: number;
  parent: number;
  kids?: number[];
  text: string;
  time: number;
  type: "comment";
}

export type { INews, IComment };
