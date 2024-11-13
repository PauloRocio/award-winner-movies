import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';
import { TypeORMProducersEntity } from './typeorm-producers.entity';
import { TypeORMAwardEditionsEntity } from './typeorm-award-editions.entity';

@Entity('winners')
export class TypeORMWinnersEntity extends TypeORMBaseEntity {
  @ManyToOne(() => TypeORMProducersEntity, { nullable: false, cascade: false })
  @JoinColumn({ name: 'producer_id' })
  producer: TypeORMProducersEntity;

  @ManyToOne(() => TypeORMAwardEditionsEntity, {
    nullable: false,
    cascade: false,
  })
  @JoinColumn({ name: 'award_edition_id' })
  awardEdition: TypeORMAwardEditionsEntity;

  @Column({ name: 'producer_id', type: 'bigint', nullable: false })
  producerId: number;

  @Column({ name: 'award_edition_id', type: 'bigint', nullable: false })
  awardEditionId: number;
}
