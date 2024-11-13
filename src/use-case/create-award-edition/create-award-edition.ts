import { Inject, Injectable } from "@nestjs/common";
import { AwardEditionsRepository } from "../../port/awards-editions.repository";
import { TypeORMAwardEditionsRepository } from "../../outbound/repository/typeorm-award-editions.repository";
import { CreateAwardEdition } from "./create-award-edition.interface";

@Injectable()
export class PerformCreateAwardEdition implements CreateAwardEdition{
    constructor(
        @Inject(TypeORMAwardEditionsRepository) private awardEditionsRepository: AwardEditionsRepository) {}
    
    async execute(year: number) {
        const awardEdition = await this.awardEditionsRepository.findAwardEditionByYear(year);

        if (awardEdition) return awardEdition;
        
        return this.awardEditionsRepository.saveAwardEdition({ year: year, title: `${year} Award Edition` });
    }
}