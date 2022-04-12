import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Transaction {
  @ObjectIdColumn()
  id: number;

  @Column()
  contract: string;

  @Column()
  from: string;

  @Column()
  to: string;

  @Column()
  value: string;
}
