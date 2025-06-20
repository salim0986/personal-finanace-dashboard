import { User } from 'src/user/user.entitiy';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Journal {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for the journal entry
  @Column({ nullable: false })
  title: string; // Title of the journal entry
  @Column({ type: 'text' })
  content: string; // Content of the journal entry
  @CreateDateColumn()
  createdAt: Date; // Date when the journal entry was created

  @ManyToOne(() => User, (user) => user.assets, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User; // Reference to the user who made the transaction

  @Column()
  userId: number;
}
