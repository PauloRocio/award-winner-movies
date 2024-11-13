import { Entity, Column, ManyToOne, JoinColumn, Index } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';
import { TypeORMMoviesEntity } from './typeorm-movies.entity';

@Entity('studios')
export class TypeORMStudiosEntity extends TypeORMBaseEntity {
  @ManyToOne(() => TypeORMMoviesEntity, { nullable: false, cascade: false })
  @JoinColumn({ name: 'movie_id' })
  movie: TypeORMMoviesEntity;

  @Index()
  @Column({ name: 'title', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'movie_id', type: 'bigint', nullable: false })
  movieId: number;
}