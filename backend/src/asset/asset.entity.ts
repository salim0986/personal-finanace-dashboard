import { User } from 'src/user/user.entitiy';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Asset {
  @PrimaryGeneratedColumn()
  id: number; // Unique identifier for the asset
  @Column({ type: 'enum', enum: ['asset', 'liability'], default: 'asset' })
  type: string; // Type of the asset, e.g., 'asset', 'liability'
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  amount: number; // Amount of the asset
  @Column({
    type: 'enum',
    enum: [
      'cash',
      'property',
      'stocks',
      'bonds',
      'electronics',
      'vehicle',
      'other',
    ],
    default: 'other',
  })
  category: string; // Category of the asset, e.g., 'cash', 'property'
  @Column({ nullable: true })
  description: string; // Description of the asset
  @CreateDateColumn()
  createdAt: Date; // Date when the asset was created

  @ManyToOne(() => User, (user) => user.assets, {
    eager: true,
    onDelete: 'CASCADE',
  })
  user: User; // Reference to the user who made the transaction

  @Column()
  userId: number;
}
