import { Entity, Column, PrimaryGeneratedColumn, Index } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';

@Entity('award_editions')
export class TypeORMAwardEditionsEntity extends TypeORMBaseEntity {
  @Column({ name: 'title', type: 'varchar', nullable: false })
  title: string;

  @Index()
  @Column({ name: 'year', type: 'int', nullable: false })
  year: number;
}