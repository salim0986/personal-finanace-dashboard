import { User } from 'src/user/user.entitiy';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Goal {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for the goal
  @Column({})
  title: string; // Title of the goal
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  targetAmount: number; // Target amount for the goal
  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  currentAmount: number; // Current amount saved towards the goal
  @Column({ type: 'date' })
  deadline: Date; // Target date for achieving the goal
  @Column({ type: 'jsonb', nullable: true, default: [] })
  history: { date: Date; amount: number }[]; // Array of amounts saved over time
  @Column({
    type: 'enum',
    enum: ['active', 'completed', 'failed'],
    default: 'active',
  })
  status: string; // Status of the goal, e.g., 'active', 'completed', 'failed'

  @CreateDateColumn()
  createdAt: Date; // Date when the goal was created

  @ManyToOne(() => User, (user) => user.goals, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User; // Reference to the user who made the transaction

  @Column()
  userId: number;
}
