export interface CreateMovie {
  execute(awardEditionId: number, title: string): Promise<CreateMovie.Response>;
}

export namespace CreateMovie {
  export type Response = {
    id: number;
    title: string;
    awardEditionId: number;
  };
}
