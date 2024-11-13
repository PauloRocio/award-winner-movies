export interface CreateWinners {
    execute(params: CreateWinners.Params): Promise<CreateWinners.Response[]>;
}

export namespace CreateWinners {
    export type Params = {
        awardEditionId: number
        producerIds: number[];
    }
    export type Response = {
        id: number;
        producerId: number;
        awardEditionId: number;
    };
}