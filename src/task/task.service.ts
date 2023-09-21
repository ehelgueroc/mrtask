import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class TaskService {
  constructor(private readonly userService: UsersService) {}

  async create(
    createTaskDto: CreateTaskDto,
    user: { sub: string; email: string },
  ) {
    const userRecord = await this.userService.findOne(user.email);
    console.log(userRecord);
    if (user) {
      // connecto to the database to create the task record
    }
    return 'This action adds a new task';
  }

  findAll() {
    return `This action returns all task`;
  }

  findOne(id: number) {
    return `This action returns a #${id} task`;
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return `This action updates a #${id} task`;
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
