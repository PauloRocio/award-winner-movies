import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, ManyToOne } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';
import { TypeORMMoviesEntity } from './typeorm-movies.entity';
import { TypeORMStudiosEntity } from './typeorm-studios.entity';
import { TypeORMAwardEditionsEntity } from './typeorm-award-editions.entity';

@Entity()
export class TypeORMProducersEntity extends TypeORMBaseEntity {
  @ManyToOne(() => TypeORMMoviesEntity, { nullable: false, cascade: false })
  @JoinColumn({ name: 'movie_id' })
  movie: TypeORMMoviesEntity;

  @ManyToOne(() => TypeORMStudiosEntity, { nullable: false, cascade: false })
  @JoinColumn({ name: 'studio_id' })
  studio: TypeORMStudiosEntity;

  @Column({ name: 'title', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'movie_id', type: 'bigint', nullable: false })
  movieId: number;

  @Column({ name: 'studio_id', type: 'bigint', nullable: false })
  studioId: number;
}