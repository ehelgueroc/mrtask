import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  private readonly users = [
    {
      id: 1,
      name: 'Steve',
      password: '',
      createdAt: '',
      updatedAt: '',
      deletedAt: '',
    },
  ];

  findAll(): any {
    return this.users;
  }

  findOne(id: string): any {
    return this.users.filter((user) => user.id === +id);
  }
}
