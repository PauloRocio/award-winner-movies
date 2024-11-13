export interface WinnersRepository {
    saveWinners(params: WinnersRepository.SaveWinners.Params): Promise<WinnersRepository.SaveWinners.Result>;
    findWinners(): Promise<WinnersRepository.FindWinners.Result>;
    findWinnersByProducerIdAndAwardEditionId(params: WinnersRepository.FindByProducerAndAward.Winner): Promise<WinnersRepository.FindWinners.Result>;
}

export namespace WinnersRepository {
    export type Winner = {
        id: number;
        // movieId: number;
        // studioId: number;
        producerId: number;
        awardEditionId: number;
    };
    export namespace SaveWinners {
        export type Params = {
            producerId: number;
            awardEditionId: number;
        };

        export type Result = Winner;
    }

    export namespace FindWinners {
        export type Result = WinnerWithAwardEdition[];

        export type WinnerWithAwardEdition = {
            id: number;
            producerId: number;
            awardEdition: AwardEditionResult
        };

        type AwardEditionResult = {
            id: number;
            title: string,
            year: number
        }
    }

    export namespace FindByProducerAndAward {
        export type Winner = {
            producerId: number;
            awardEditionId: number;
        }

        export type Result = Winner;
    }
}
