import { PrimaryGeneratedColumn } from 'typeorm';

export abstract class TypeORMBaseEntity {
  @PrimaryGeneratedColumn({ name: 'id', type: 'int' })
  id: number;
}
