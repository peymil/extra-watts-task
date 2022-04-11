import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Approval {
  @PrimaryGeneratedColumn()
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
