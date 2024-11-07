export interface WinnersRepository {
    saveWinners(params: WinnersRepository.Params): Promise<WinnersRepository.Result>;
}

export namespace WinnersRepository {
    export type Params = {
        movieId: number;
        studioId: number;
        producerId: number;
        awardEditionId: number;
    };

    export type Result = Winner;

    export type Winner = {
        id: number;
        movieId: number;
        studioId: number;
        producerId: number;
        awardEditionId: number;
    };
}
