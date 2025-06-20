import { Asset } from 'src/asset/asset.entity';
import { Goal } from 'src/goal/goal.entity';
import { Journal } from 'src/journal/journal.entity';
import { Transaction } from 'src/transaction/transaction.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;
  @Column()
  password: string;
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];

  @OneToMany(() => Asset, (asset) => asset.user)
  assets: Asset[];

  @OneToMany(() => Journal, (journal) => journal.user)
  journals: Journal[];

  @OneToMany(() => Goal, (goal) => goal.user)
  goals: Goal[];
}
