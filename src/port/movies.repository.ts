export interface MoviesRepository {
    saveMovies(params: MoviesRepository.Params): Promise<MoviesRepository.Result>;
}

export namespace MoviesRepository {
    export type Params = {
        title: string;
        awardEditionId: number;
    };

    export type Result = Movie;

    export type Movie = {
        id: number;
        title: string;
        awardEditionId: number;
    };
}
