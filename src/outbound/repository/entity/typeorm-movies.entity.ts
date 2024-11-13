import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';
import { TypeORMAwardEditionsEntity } from './typeorm-award-editions.entity';

@Entity('movies')
export class TypeORMMoviesEntity extends TypeORMBaseEntity {
  @ManyToOne(() => TypeORMAwardEditionsEntity, { nullable: false, cascade: false })
  @JoinColumn({ name: 'award_edition_id' })
  awardEdition: TypeORMAwardEditionsEntity;

  @Column({ name: 'title', type: 'varchar', nullable: false })
  title: string;

  @Column({ name: 'award_edition_id', type: 'bigint', nullable: false })
  awardEditionId: number;
}