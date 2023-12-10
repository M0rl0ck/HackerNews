interface IItem {
  by: string;
  id: number;
  kids?: number[];
  time: number;
  deleted: boolean;
  dead: boolean;
}
interface INews extends IItem {
  descendants: number;
  score: number;
  title: string;
  type: "story";
  url: string;
}

interface IComment extends IItem {
  parent: number;
  text: string;
  type: "comment";
}

export type { INews, IComment };
