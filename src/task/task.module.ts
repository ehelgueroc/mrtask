import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [TaskController],
  providers: [TaskService],
  imports: [UsersModule],
})
export class TaskModule {}
