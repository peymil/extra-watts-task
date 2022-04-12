import { Entity, Column, ObjectIdColumn } from 'typeorm';

@Entity()
export class Approval {
  @ObjectIdColumn()
  id: number;

  @Column()
  contract: string;

  @Column()
  owner: string;

  @Column()
  spender: string;

  @Column()
  value: string;
}
