import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';
import { TypeORMMoviesEntity } from './typeorm-movies.entity';

@Entity()
export class TypeORMStudiosEntity extends TypeORMBaseEntity {
  @ManyToOne(() => TypeORMMoviesEntity, { nullable: false, cascade: false })
  @JoinColumn({ name: 'movie_id' })
  movie: TypeORMMoviesEntity;

  @Column({ name: 'title', type: 'varchar', nullable: false })
  name: string;

  @Column({ name: 'movie_id', type: 'bigint', nullable: false })
  movieId: number;
}