export interface ProducersRepository {
  saveProducers(
    params: ProducersRepository.SaveProducers.Params,
  ): Promise<ProducersRepository.SaveProducers.Result>;
  findById(
    params: ProducersRepository.FindById.Params,
  ): Promise<ProducersRepository.FindById.Result>;
  findProducersByName(
    name: string,
  ): Promise<ProducersRepository.FindById.Result>;
}

export namespace ProducersRepository {
  export namespace SaveProducers {
    export type Params = {
      name: string;
    };

    export type Result = Producer;

    export type Producer = {
      id: number;
      name: string;
    };
  }

  export namespace FindById {
    export type Params = {
      id: number;
    };

    export type Result = Producer;

    export type Producer = {
      id: number;
      name: string;
    };
  }
}
