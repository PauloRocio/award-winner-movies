export interface AwardEditionsRepository {
    saveAwardEdition(params: AwardEditionsRepository.SaveAwardEdition.Params): Promise<AwardEditionsRepository.SaveAwardEdition.Result>;
    findWinners(): Promise<AwardEditionsRepository.FindWinners.Result>;
    findAwardEditionByYear(year: number): Promise<AwardEditionsRepository.Winners>;
}

export namespace AwardEditionsRepository {
    export type Winners = {
        id: number;
        title: string;
        year: number;
    };
    export namespace SaveAwardEdition {
        export type Params = {
            title: string;
            year: number;
        };

        export type Result = Winners;
    }

    export namespace FindWinners {
        export type Result = Winners[];
    }

    export namespace FindAwardEditionByYear {
        export type Result = Winners;
    }
}
