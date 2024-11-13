export interface GetWinners {
    execute(): Promise<GetWinners.Response>;
}

export namespace GetWinners {
    export type Response = { min: result[], max: result[] };

    type result = {
        producer: string; interval: number, previousWin: number, followingWin: number
    };
}
