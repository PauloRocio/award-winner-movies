import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';
import { TypeORMMoviesEntity } from './typeorm-movies.entity';
import { TypeORMStudiosEntity } from './typeorm-studios.entity';
import { TypeORMProducersEntity } from './typeorm-producers.entity';
import { TypeORMAwardEditionsEntity } from './typeorm-award-editions.entity';

@Entity('winners')
export class TypeORMWinnersEntity extends TypeORMBaseEntity {
  // @ManyToOne(() => TypeORMMoviesEntity, { nullable: false, cascade: false })
  // @JoinColumn({ name: 'movie_id' })
  // movie: TypeORMMoviesEntity;

  // @ManyToOne(() => TypeORMStudiosEntity, { nullable: false, cascade: false })
  // @JoinColumn({ name: 'studio_id' })
  // studio: TypeORMStudiosEntity;

  @ManyToOne(() => TypeORMProducersEntity, { nullable: false, cascade: false })
  @JoinColumn({ name: 'producer_id' })
  producer: TypeORMProducersEntity;

  @ManyToOne(() => TypeORMAwardEditionsEntity, { nullable: false, cascade: false })
  @JoinColumn({ name: 'award_edition_id' })
  awardEdition: TypeORMAwardEditionsEntity;

  // @Column({ name: 'movie_id', type: 'bigint', nullable: false })
  // movieId: number;

  // @Column({ name: 'studio_id', type: 'bigint', nullable: false })
  // studioId: number;

  @Column({ name: 'producer_id', type: 'bigint', nullable: false })
  producerId: number;

  @Column({ name: 'award_edition_id', type: 'bigint', nullable: false })
  awardEditionId: number;
}