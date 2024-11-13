export interface CreateProducers {
  execute(producers: string): Promise<CreateProducers.Response[]>;
}

export namespace CreateProducers {
  export type Response = {
    id: number;
    name: string;
  };
}
