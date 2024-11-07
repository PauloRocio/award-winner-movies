import { Injectable } from "@nestjs/common";
import { GetWinners } from "./get-winners.interface";

@Injectable()
export class PerformGetWinners implements GetWinners {
    constructor(
        // @Inject(storeDispatchLimitConfig.KEY)
        // private readonly storeDispatchConfigs: ConfigType<typeof storeDispatchLimitConfig>,
        // @Inject(IoC.MetricHandler) private readonly metricHandler: MetricHandler,
        // @Inject(NuvemshopStorePlanClient) private readonly storePlanClient: GetNuvemshopStorePlan,
        // @Inject(TypeORMStoreRepository) private readonly storeRepository: StoreRepository,
        // @Inject(CachedPlanRepository) private readonly planRepository: PlanRepository,
        // @Inject(TypeORMDispatchLimitHistoryRepository)
        // private readonly dispatchLimitHistoryRepository: DispatchLimitHistoryRepository,
    ) {}

    async execute(): Promise<GetWinners.Response> {
        try {
            console.log('Sucesso!')
            return new Promise((resolve) => {
                resolve({ name: 'João' });
            })
        } catch (err) {
            throw err;
        }
    }
}
