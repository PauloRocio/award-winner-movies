export interface CreateStudios {
    execute(movieId: number, studios: string): Promise<CreateStudios.Response[]>;
}

export namespace CreateStudios {
    export type Response = {
        id: number;
        name: string;
        movieId: number;
    };
}