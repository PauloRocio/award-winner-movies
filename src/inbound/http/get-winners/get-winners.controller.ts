import { Controller, Get, HttpCode, HttpStatus, Inject } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PerformGetWinners } from '../../../use-case/get-winners/get-winners';
import { GetWinners } from '../../../use-case/get-winners/get-winners.interface';
import { GetWinnerResponse } from './dto/get-winner-response.dto';

@ApiTags('Winners')
@Controller('/winners')
export class WinnersController {
    constructor(
        @Inject(PerformGetWinners) private readonly getWinners: GetWinners,
    ) {}

    @ApiOperation({ description: 'Get winners with max e min time between prizes' })
    @HttpCode(HttpStatus.OK)
    @Get()
    async getAwardsWinners(): Promise<GetWinnerResponse> {
        return await this.getWinners.execute();
    }
}
