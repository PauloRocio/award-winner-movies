import { Entity, Column } from 'typeorm';
import { TypeORMBaseEntity } from './typeorm-base.entity';

@Entity('producers')
export class TypeORMProducersEntity extends TypeORMBaseEntity {
  @Column({ name: 'title', type: 'varchar', nullable: false })
  name: string;
}
