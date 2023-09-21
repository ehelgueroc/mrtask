import { IsNotEmpty } from 'class-validator';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @IsNotEmpty()
  public name: string;

  @Column()
  public description: string;

  @Column({ default: 'todo' })
  public status: string;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  public deletedAt: Date;

  @ManyToOne(() => User, (author: User) => author.tasks)
  public author: User;

  constructor(partial: Partial<Task>) {
    Object.assign(this, partial);
  }
}
