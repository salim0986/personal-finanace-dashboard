import { User } from 'src/user/user.entitiy';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'enum', enum: ['income', 'expense'], default: 'expense' })
  type: string; // e.g., 'income', 'expense'
  @Column()
  amount: number; // Amount of the transaction
  @Column()
  date: Date; // Date of the transaction
  @Column({
    type: 'enum',
    enum: [
      'food',
      'transport',
      'entertainment',
      'utilities',
      'salary',
      'other',
    ],
    default: 'other',
  })
  category: string; // Category of the transaction, e.g., 'food', 'transport'
  @Column({ nullable: true })
  description: string; // Description of the transaction
  @CreateDateColumn()
  createdAt: Date; // Date when the transaction was created

  @ManyToOne(() => User, (user) => user.transactions, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User; // Reference to the user who made the transaction

  @Column()
  userId: number;
}
