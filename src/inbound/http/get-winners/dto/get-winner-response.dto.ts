export type GetWinnerResponse = {
  min: Winner[];
  max: Winner[];
};

type Winner = {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
};
