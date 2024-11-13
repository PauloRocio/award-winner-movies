export interface StudiosRepository {
    saveStudios(params: StudiosRepository.SaveStudios.Params): Promise<StudiosRepository.SaveStudios.Result>;
    findStudiosByName(name: string): Promise<StudiosRepository.GetStudio.Response>;
}

export namespace StudiosRepository {
    export namespace SaveStudios {
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
    };

    export namespace GetStudio {
        export type Response = {
            id: number;
            name: string;
            movieId: number;
        };
    }
}
