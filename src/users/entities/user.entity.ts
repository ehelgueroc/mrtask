import { Exclude, Transform } from 'class-transformer';
import { Task } from 'src/task/entities/task.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public name: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  public password: string;

  @Column({ default: true })
  public isActive: boolean;

  @CreateDateColumn()
  public createdAt: Date;

  @UpdateDateColumn()
  public updatedAt: Date;

  @DeleteDateColumn()
  @Transform((value) => {
    if (value !== null) {
      return value;
    }
  })
  public deletedAt?: Date;

  @OneToMany(() => Task, (task: Task) => task.author)
  public tasks: Task[];

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
