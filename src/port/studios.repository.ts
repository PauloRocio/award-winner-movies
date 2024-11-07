export interface StudiosRepository {
    saveStudios(params: StudiosRepository.Params): Promise<StudiosRepository.Result>;
}

export namespace StudiosRepository {
    export type Params = {
        name: string;
        movieId: number;
    };

    export type Result = Studio;

    export type Studio = {
        id: number;
        name: string;
        movieId: number;
    };
}
