import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';

@Entity()
export class TypeORMAwardEditionsEntity extends TypeORMBaseEntity {
  @Column({ name: 'title', type: 'varchar', nullable: false })
  title: string;

  @Column({ name: 'year', type: 'varchar', nullable: false })
  year: string;
}