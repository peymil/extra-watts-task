import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
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
