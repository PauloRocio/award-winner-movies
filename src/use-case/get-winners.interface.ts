export interface GetWinners {
    execute(): Promise<GetWinners.Response>;
}

export namespace GetWinners {
    export type Response = {
        name: string;
    };
}
