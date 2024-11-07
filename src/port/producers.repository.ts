export interface ProducersRepository {
    saveProducers(params: ProducersRepository.Params): Promise<ProducersRepository.Result>;
}

export namespace ProducersRepository {
    export type Params = {
        name: string;
        movieId: number;
        studioId: number;
    };

    export type Result = Movie;

    export type Movie = {
        id: number;
        name: string;
        movieId: number;
        studioId: number;
    };
}
