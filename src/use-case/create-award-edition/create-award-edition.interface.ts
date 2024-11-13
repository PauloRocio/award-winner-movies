export interface CreateAwardEdition {
    execute(year: number): Promise<CreateAwardEdition.Response>;
}

export namespace CreateAwardEdition {
    export type Response = {
        id: number;
        title: string;
        year: number;
    };
}
