export interface AwardEditionsRepository {
    saveAwardEdition(params: AwardEditionsRepository.Params): Promise<AwardEditionsRepository.Result>;
}

export namespace AwardEditionsRepository {
    export type Params = {
        title: string;
        year: number;
    };

    export type Result = Winners;

    export type Winners = {
        id: number;
        title: string;
        year: number;
    };
}
